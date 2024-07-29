import { groq } from "next-sanity";

export const homeQuery = groq`*[_type == "home"][0]{
   ...,
   "collection1": collection1 {
      ...,
      products[]->{
         _id,
         store
      }
   },
   "collection2": collection2 {
      ...,
      products[]->{
         _id,
         store
      }
   },
}`