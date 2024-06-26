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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/storefront/components/ui/radio-group";
import { Label } from "@/storefront/components/ui/label";

const OPTIONS = [
  { title: "Pris - Lägst först", value: "lowest" },
  { title: "Pris - Högst först", value: "highest" },
  { title: "Nyast först", value: "newest" },
  { title: "Populärast först", value: "popular" },
];

export function CategorySort() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full justify-between gap-2 group h-11 px-5 md:h-10 md:px-4 text-base md:text-sm"
            variant="outline"
          >
            Sortera
            <ChevronDown className="size-5 group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <RadioGroup defaultValue="option-one" className="gap-0">
            <DropdownMenuLabel>Sortera</DropdownMenuLabel>
            {OPTIONS.map((option) => (
              <DropdownMenuItem key={option.value} className="flex gap-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="font-normal">
                  {option.title}
                </Label>
              </DropdownMenuItem>
            ))}
          </RadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
