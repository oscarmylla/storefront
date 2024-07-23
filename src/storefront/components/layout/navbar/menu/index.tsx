import React from "react";
import { MenuClient } from "./client";
import { getCategories } from "@/sanity/data/category";

export async function Menu() {
  const categories = await getCategories();
  return <MenuClient categories={categories} />;
}
