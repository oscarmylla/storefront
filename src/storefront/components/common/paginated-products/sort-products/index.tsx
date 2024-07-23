"use client";

import { Button } from "@/storefront/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/storefront/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/storefront/components/ui/radio-group";
import { Label } from "@/storefront/components/ui/label";
import { useQueryParams } from "@/storefront/hooks/use-query-params";
import { ChangeEvent, FormEvent, FormEventHandler } from "react";

export type SortOptions =
  | "created_at"
  | "price_asc"
  | "price_desc"
  | "title"
  | "best_selling";

export const sortOptions: {
  value: SortOptions;
  label: string;
}[] = [
  {
    value: "best_selling",
    label: "Populära",
  },
  {
    value: "created_at",
    label: "Senaste",
  },
  {
    value: "price_asc",
    label: "Pris: Låg -> Hög",
  },
  {
    value: "price_desc",
    label: "Pris: Hög -> Låg",
  },
  {
    value: "title",
    label: "Namn: A -> Ö",
  },
];

export const Sort = ({ order = "best_selling" }: { order?: SortOptions }) => {
  const { setQueryParams } = useQueryParams();
  const label = sortOptions.find((option) => option.value === order)?.label;

  const handleChange = (value: string) => {
    setQueryParams("order", encodeURIComponent(value), ["page"]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full justify-between gap-2 group h-11 px-5 md:h-10 md:px-4 text-base md:text-sm"
          variant="outline"
        >
          {label ?? "Sortera"}
          <ChevronDown className="size-5 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <RadioGroup
          defaultValue={order}
          className="gap-0"
          onValueChange={handleChange}
        >
          <DropdownMenuLabel>Sortera</DropdownMenuLabel>
          {sortOptions.map((option) => (
            <DropdownMenuItem key={option.value} className="flex gap-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="font-normal">
                {option.label}
              </Label>
            </DropdownMenuItem>
          ))}
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sort;
