import { groq } from "next-sanity";
import { postFields } from "../fragments/post";

export const heroQuery = groq`*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
  content,
  ${postFields}
}`;


export const homeQuery = groq`*[_type == "home"][0]{
   ...,
   "collection1": collection1 {
      ...,
      products[]->{
         _id,
         store,
         "variant": store.variants[0]->.store
      }
   },
   "collection2": collection2 {
      ...,
      products[]->{
         _id,
         store,
         "variant": store.variants[0]->.store
      }
   },
   "vendors": vendors.vendors[]->
}`