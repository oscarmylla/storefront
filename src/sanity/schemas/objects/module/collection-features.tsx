import { PackageIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const collectionFeatures = defineField({
  name: "collections",
  title: "Collections",
  type: "object",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "picture",
      title: "Picture",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return "Required";
              }
              return true;
            });
          },
        },
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paragraph",
      type: "string",
    }),
    defineField({
      name: "link",
      type: "link",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      products: "products",
    },
    prepare({ title, products }) {
      return {
        title: title,
        subtitle: products ? `${products.length} products` : "No products",
      };
    },
  },
});
