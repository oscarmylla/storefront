import { getCategories } from "@/sanity/data/category";
import { NavigationClient } from "./client";

export async function Navigation() {
  const categories = await getCategories();

  return <NavigationClient categories={categories} />;
}
