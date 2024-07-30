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
         type: "text",
      }),
      defineField({
         name: 'quote',
         type: 'text',
         rows: 2,
      }),
      defineField({
         name: "images",
         title: "Images",
         type: "array",
         of: [{
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
         }],
      }),
      defineField({
         name: 'instagram',
         title: 'Instagram',
         type: 'url',
      }),
      defineField({
         name: 'facebook',
         title: 'Facebook',
         type: 'url',
      }),
      defineField({
         name: "logo",
         title: "Logo",
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
   ]
})
