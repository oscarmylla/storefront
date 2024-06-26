import { groq } from "next-sanity";
import { postFields } from "../fragments/post";

export const heroQuery = groq`*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
  content,
  ${postFields}
}`;