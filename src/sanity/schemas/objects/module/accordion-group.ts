import { defineField } from 'sanity'
import { blocksToText } from "@/sanity/utils/blocksToText"

export const accordionGroup = defineField({
  name: 'accordionGroup',
  title: 'Accordion Group',
  type: 'object',
  icon: false,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'portableTextSimple',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      body: 'body',
    },
    prepare({ title, body }) {
      return {
        title,
        subtitle: body && blocksToText(body),
      }
    },
  },
})
