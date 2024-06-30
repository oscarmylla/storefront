import { CategoryWithProductCountAndThumbnails } from "@/sanity/types/category";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CategoryGridItem({
  category,
}: {
  category: CategoryWithProductCountAndThumbnails;
}) {
  return (
    <li className="bg-background shadow-sm rounded-xl p-4">
      <Link href={`/categories/${category.slug?.current}`}>
        <h2 className="font-semibold md:text-lg flex justify-between items-center">
          {category.title}
          <ChevronRight className="size-4 text-muted-foreground/60" />
        </h2>
        <p className="text-muted-foreground text-sm">
          {category.product_count} varor
        </p>
        <div className="flex gap-3 mt-3 md:mt-4">
          {category.thumbnails.map((thumbnail, index) => {
            if (!thumbnail) return null;
            return (
              <div className="aspect-square basis-11 relative" key={index}>
                <Image
                  src={thumbnail}
                  alt=""
                  className="rounded-sm object-cover"
                  fill
                  sizes="100px"
                />
              </div>
            );
          })}
        </div>
      </Link>
    </li>
  );
}
