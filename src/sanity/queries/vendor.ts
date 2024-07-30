import { groq } from "next-sanity";

export const vendorsQuery = groq`*[_type == "vendor"]`
export const vendorByHandleQuery = groq`*[_type == "vendor" && slug.current == $slug][0]`