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
