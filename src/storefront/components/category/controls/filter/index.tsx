import { Button } from "@/storefront/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/storefront/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";
import { Checkbox } from "@/storefront/components/ui/checkbox";

const OPTIONS = [
  { title: "Ekologiskt", value: "organic" },
  { title: "Veganskt", value: "vegan" },
  { title: "Glutenfritt", value: "gluten-free" },
  { title: "Laktosfritt", value: "lactose-free" },
];

export function CategoryFilter() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full justify-between gap-2 group h-11 px-5 md:h-10 md:px-4 text-base md:text-sm"
            variant="outline"
          >
            Filtrera
            <ChevronDown className="size-5 group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filtrera</DropdownMenuLabel>
          {OPTIONS.map((option) => (
            <DropdownMenuItem key={option.value} className="flex gap-2">
              <Checkbox />
              {option.title}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-1.5">
            <X className="size-4" />
            Rensa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
