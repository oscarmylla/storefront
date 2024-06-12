import { Category } from "@/sanity.types";

export type CategoryWithChildrenAndProductCount = Category & {
   product_count: number;
   category_children: (Category & { product_count: number })[];
};