import { groq } from "next-sanity";

export const productsQuery = groq`*[_type == "product"][0...40]`

export const productByHandleQuery = groq`*[_type == "product" && store.slug.current == $handle][0]{
   ...,
   categoryPath[]->
}`

export const productsByIdsQuery = groq`*[_type == "product" && _id in $ids]`