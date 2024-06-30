import { Category } from "@/sanity.types";

export type CategoryWithProductCount = Category & {
   product_count: number;
};

export type CategoryWithProductCountAndThumbnails = CategoryWithProductCount & {
   thumbnails: (string | null)[];
};

export type CategoryWithChildrenAndProductCount = Category & {
   product_count: number;
   category_children: (Category & { product_count: number })[];
};