import { TagIcon } from "@sanity/icons";
import pluralize from "pluralize-esm";
import ProductHiddenInput from "@/sanity/components/inputs/product-hidden";
import ShopifyDocumentStatus from "@/sanity/components/media/shopify-document-status";
import { defineField, defineType } from "sanity";
import { getPriceRange } from "@/sanity/utils/getPriceRange";
import { GROUPS, SANITY_API_VERSION } from "@/sanity/constants";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TagIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: "hidden",
      type: "string",
      components: {
        field: ProductHiddenInput,
      },
      group: GROUPS.map((group) => group.name),
      hidden: ({ parent }) => {
        const isActive = parent?.store?.status === "active";
        const isDeleted = parent?.store?.isDeleted;
        return !parent?.store || (isActive && !isDeleted);
      },
    }),
    defineField({
      name: "titleProxy",
      title: "Title",
      type: "proxyString",
      options: { field: "store.title" },
    }),
    defineField({
      name: "slugProxy",
      title: "Slug",
      type: "proxyString",
      options: { field: "store.slug.current" },
    }),
    defineField({
      name: "colorTheme",
      type: "reference",
      to: [{ type: "colorTheme" }],
      group: "editorial",
    }),
    defineField({
      name: "body",
      type: "portableText",
      group: "editorial",
    }),
    defineField({
      name: "store",
      type: "shopifyProduct",
      description: "Product data from Shopify (read-only)",
      group: "shopifySync",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "vendor",
      type: "reference",
      to: [{ type: "vendor" }],
      group: "editorial",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      group: "editorial",
      options: {
        filter: async ({ getClient }) => {
          const client = getClient({ apiVersion: SANITY_API_VERSION });
          const categoryBranchIds = await client.fetch(
            '*[_type == "category" && defined(parent._ref)].parent._ref'
          );

          return {
            filter: "!(_id in $categoryBranchIds)",
            params: { categoryBranchIds },
          };
        },
      },
    }),
    defineField({
      name: "categoryPath",
      title: "Path",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      description:
        "This array contains references to all parent categories, maintaining order from the root.",
      readOnly: true,
      group: "editorial",
    }),
    defineField({
      name: "sales",
      title: "Sales",
      type: "number",
    }),
    defineField({
      name: "origin",
      type: "object",
      group: "editorial",
      fields: [
        defineField({
          name: "country",
          type: "string",
        }),
        defineField({
          name: "city",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "tradeName",
      type: "text",
      group: "editorial",
    }),
    defineField({
      name: "description",
      type: "text",
      group: "editorial",
    }),
    defineField({
      name: "usage",
      type: "text",
      group: "editorial",
    }),
    defineField({
      name: "other",
      type: "text",
      group: "editorial",
    }),
    defineField({
      name: "size",
      type: "string",
      group: "editorial",
    }),
    defineField({
      name: "packaging",
      type: "text",
      group: "editorial",
    }),
    defineField({
      name: "storage",
      type: "text",
      group: "editorial",
    }),
    defineField({
      name: "ingredients",
      type: "text",
      group: "editorial",
    }),
    defineField({
      name: "labels",
      type: "text",
      group: "editorial",
    }),
    defineField({
      name: "allergens",
      type: "text",
      group: "editorial",
    }),
    defineField({
      name: "nutritionalValue",
      type: "object",
      group: "editorial",
      fields: [
        defineField({
          name: "calories",
          type: "number",
        }),
        defineField({
          name: "protein",
          type: "number",
        }),
        defineField({
          name: "carbohydrates",
          type: "number",
        }),
        defineField({
          name: "sugars",
          type: "number",
        }),
        defineField({
          name: "fiber",
          type: "number",
        }),
        defineField({
          name: "fat",
          type: "number",
        }),
        defineField({
          name: "saturated",
          type: "number",
        }),
        defineField({
          name: "salt",
          type: "number",
        }),
        defineField({
          name: "other",
          type: "text",
        }),
      ],
    }),
  ],
  orderings: [
    {
      name: "titleAsc",
      title: "Title (A-Z)",
      by: [{ field: "store.title", direction: "asc" }],
    },
    {
      name: "titleDesc",
      title: "Title (Z-A)",
      by: [{ field: "store.title", direction: "desc" }],
    },
    {
      name: "priceDesc",
      title: "Price (Highest first)",
      by: [{ field: "store.priceRange.minVariantPrice", direction: "desc" }],
    },
    {
      name: "priceAsc",
      title: "Price (Lowest first)",
      by: [{ field: "store.priceRange.minVariantPrice", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      isDeleted: "store.isDeleted",
      options: "store.options",
      previewImageUrl: "store.previewImageUrl",
      priceRange: "store.priceRange",
      status: "store.status",
      title: "store.title",
      variants: "store.variants",
    },
    prepare(selection) {
      const {
        isDeleted,
        options,
        previewImageUrl,
        priceRange,
        status,
        title,
        variants,
      } = selection;

      const optionCount = options?.length;
      const variantCount = variants?.length;

      let description = [
        variantCount ? pluralize("variant", variantCount, true) : "No variants",
        optionCount ? pluralize("option", optionCount, true) : "No options",
      ];

      let subtitle = getPriceRange(priceRange);
      if (status !== "active") {
        subtitle = "(Unavailable in Shopify)";
      }
      if (isDeleted) {
        subtitle = "(Deleted from Shopify)";
      }

      return {
        description: description.join(" / "),
        subtitle,
        title,
        media: (
          <ShopifyDocumentStatus
            isActive={status === "active"}
            isDeleted={isDeleted}
            type="product"
            url={previewImageUrl}
            title={title}
          />
        ),
      };
    },
  },
});
