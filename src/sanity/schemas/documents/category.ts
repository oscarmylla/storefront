import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const category = defineType({
   name: 'category',
   title: 'Category',
   type: 'document',
   icon: TagIcon,
   fields: [
      defineField({ name: 'title', type: 'string' }),
      defineField({
         name: 'parent',
         type: 'reference',
         to: [{ type: 'category' }],
         // This ensures we cannot select other "children"
         // options: {
         //    filter: '!defined(parent)',
         // },
      }),
      defineField({
         name: "slug",
         title: "Slug",
         type: "slug",
         description: "A slug is required for the post to show up in the preview",
         options: {
            source: "title",
            maxLength: 96,
            isUnique: (value, context) => context.defaultIsUnique(value, context),
         },
         validation: (rule) => rule.required(),
      }),
   ],

   preview: {
      select: {
         title: 'title',
         subtitle: 'parent.title',
      },
      prepare: ({ title, subtitle }) => ({
         title,
         subtitle: subtitle ? `– ${subtitle}` : ``,
      }),
   },
})