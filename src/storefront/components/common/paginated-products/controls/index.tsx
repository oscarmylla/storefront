import { TagFilter } from "../tag-filter";
import Sort, { SortOptions, sortOptions } from "../sort-products";

export function PaginatedControls({ order }: { order?: SortOptions }) {
  return (
    <div className="flex gap-2">
      <TagFilter />
      <Sort order={order} />
    </div>
  );
}
