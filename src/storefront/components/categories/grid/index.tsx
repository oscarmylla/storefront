import { getCategories } from "@/sanity/data/category";
import { CategoryGridItem } from "./item";

export const categoryGridClasses = "grid md:grid-cols-2 gap-4 lg:grid-cols-3";

export async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <ul className={categoryGridClasses}>
      {categories.map((category) => (
        <CategoryGridItem category={category} key={category._id} />
      ))}
    </ul>
  );
}
