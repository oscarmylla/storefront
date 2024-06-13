import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "settings"][0]`;

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroQuery = groq`*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
  content,
  ${postFields}
}`;

export const moreStoriesQuery = groq`*[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
  ${postFields}
}`;

export const postQuery = groq`*[_type == "post" && slug.current == $slug] [0] {
  content,
  ${postFields}
}`;

export const categoriesQuery = groq`*[_type == "category" && !defined(parent)]{
    ...,
    "product_count": count(*[_type=="product" && references(^._id)])
}`;

// export const categoriesByPathQuery = groq`*[_type == "category" && slug.current in $slugs]{
//     ...,
//     "product_count": count(*[_type == "product" && (references(*[_type == "category" && ^.^._id in path[]._ref]._id) || references(^._id))]),
//     "category_children": *[_type=="category" && parent._ref == ^._id]{
//       ...,
//       "product_count": count(*[_type == "product" && (references(*[_type == "category" && ^.^._id in path[]._ref]._id) || references(^._id))])
//     }
// }`;

// export const categoriesByPathQuery = groq`*[_type == "category" && slug.current in $slugs]{
//     ...,
//     "product_count": count(*[_type == "product" && ^._id in category->path[]._ref]),
//     "category_children": *[_type=="category" && parent._ref == ^._id]{
//       ...,
//       "product_count": count(*[_type == "product" && ^._id in category->path[]._ref])
//     }
// }`;

export const categoriesByPathQuery = groq`*[_type == "category" && slug.current in $slugs]{
    ...,
    "product_count": count(*[_type == "product" && references(^._id)]),
    "category_children": *[_type=="category" && parent._ref == ^._id]{
      ...,
      "product_count": count(*[_type == "product" && references(^._id)])
    }
}`;

export const categoryProductsQuery = groq`*[_type == "product" && references($id) && store.status == "active"] | order(defined(sales) desc, sales desc, _createdAt desc){
  ...,
  "sales": null
}`;

export const categoryPathQuery = groq`*[_type == "category" && _id == $id][0]{ path }`