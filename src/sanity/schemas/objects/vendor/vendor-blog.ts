import { defineArrayMember, defineField } from 'sanity'

export const vendorBlog = defineField({
   name: 'vendorBlog',
   title: 'Vendor Blog',
   type: 'object',
   options: {
      collapsed: false,
      collapsible: true,
   },
   fields: [
      defineField({
         name: 'title',
         type: 'string',
         validation: (Rule) =>
            Rule.max(50).warning('Longer titles may be truncated by search engines'),
      }),
      defineField({
         name: "content",
         title: "Content",
         type: "array",
         of: [{ type: "block" }],
      }),
      defineField({
         name: 'quote',
         type: 'text',
         rows: 2,
      }),
   ]
})
