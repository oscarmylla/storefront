import React from "react";
import { CategorySort } from "./sort";
import { CategoryFilter } from "./filter";

export default function CategoryControls() {
  return (
    <div className="flex gap-1.5">
      <CategorySort />
      <CategoryFilter />
    </div>
  );
}
