import { groq } from "next-sanity";

export const categoriesQuery = groq`*[_type == "category" && !defined(parent)]{
    ...,
    "product_count": count(*[_type=="product" && references(^._id) && store.status == "active"]),
    "thumbnails": *[_type=="product" && references(^._id)][0...5].store.previewImageUrl
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
    "product_count": count(*[_type == "product" && references(^._id) && store.status == "active"]),
    "category_children": *[_type=="category" && parent._ref == ^._id]{
      ...,
      "product_count": count(*[_type == "product" && references(^._id) && store.status == "active"])
    }
}`;

// defined(sales) desc,

export const categoryProductsQuery = groq`*[_type == "product" && references($id) && store.status == "active"] | order(select(
  $order == "title" => 'sales asc')){
  ...,
  "sales": null
}`;

export const categoryPathQuery = groq`*[_type == "category" && _id == $id][0]{ path }`