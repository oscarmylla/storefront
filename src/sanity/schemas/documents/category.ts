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
         name: 'path',
         title: 'Path',
         type: 'array',
         of: [{ type: 'reference', to: [{ type: 'category' }] }],
         description: 'This array contains references to all parent categories, maintaining order from the root.',
         readOnly: true,
      }),
   ],

   preview: {
      select: {
         title: 'title',
         path0: 'path.0.title',
         path1: 'path.1.title',
         path2: 'path.2.title',
         path3: 'path.3.title',
      },
      prepare: ({ title, path0, path1, path2, path3 }) => {
         const paths = [path0, path1, path2].filter(Boolean)
         const subtitle = paths.length > 0 ? paths.join(' > ') : ''
         const hasMoreAuthors = Boolean(path3)

         return ({
            title,
            subtitle: hasMoreAuthors ? `${subtitle}...` : subtitle
         })
      },
   },
})