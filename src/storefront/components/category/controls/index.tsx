import React from "react";
import { CategorySort } from "./sort";
import { CategoryFilter } from "./filter";

export default function CategoryControls() {
  return (
    <div className="flex gap-2">
      <CategoryFilter />
      <CategorySort />
    </div>
  );
}
