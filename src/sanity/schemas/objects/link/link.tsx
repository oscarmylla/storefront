import { LinkIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const link = defineField({
  title: "Link",
  name: "link",
  type: "object",
  icon: LinkIcon,
  components: {
    annotation: (props) => (
      <span>
        <LinkIcon
          style={{
            marginLeft: "0.05em",
            marginRight: "0.1em",
            width: "0.75em",
          }}
        />
        {props.renderDefault(props)}
      </span>
    ),
  },
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
