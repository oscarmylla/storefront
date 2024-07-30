import { PackageIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const vendorFeatures = defineField({
  name: "vendors",
  title: "Vendors",
  type: "object",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "vendors",
      title: "Vendors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "vendor" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      vendors: "vendors",
    },
    prepare({ title, vendors }) {
      return {
        title: title,
        subtitle: vendors ? `${vendors.length} vendors` : "No vendors",
      };
    },
  },
});
