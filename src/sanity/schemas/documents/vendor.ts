import { validateSlug } from "@/sanity/utils/validateSlug";
import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const vendor = defineType({
  name: "vendor",
  title: "Vendor",
  icon: UserIcon,
  type: "document",
  groups: [
    {
      title: "Blog",
      name: "blog",
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.thumbnail as any)?.asset?._ref && !alt) {
                return "Required";
              }
              return true;
            });
          },
        },
      ],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: validateSlug,
    }),
    defineField({
      type: "vendorBlog",
      name: "blog",
    })
  ],
});
