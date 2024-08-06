import { Product } from "@/sanity.types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/storefront/components/ui/collapsible";
import { cn } from "@/storefront/lib/utils";
import { ChevronDown } from "lucide-react";

function ProductNutritionItem({
  label,
  value,
  comment,
}: {
  label: string;
  value?: string;
  comment?: {
    label: string;
    value: string;
  };
}) {
  if (!value) return null;
  return (
    <div className="space-y-1">
      <div className="flex md:gap-x-10">
        <h2 className="text-[0.95rem] font-semibold basis-[10rem] shrink-0">
          {label}
        </h2>
        <p>{value}</p>
      </div>
      {comment && (
        <div className="flex md:gap-x-10">
          <h2 className="text-[0.95rem] font-medium basis-[10rem] shrink-0 pl-3">
            {comment.label}
          </h2>
          <p>{comment.value}</p>
        </div>
      )}
    </div>
  );
}

export function ProductNutrition({
  nutritionalValue,
}: {
  nutritionalValue: Product["nutritionalValue"];
}) {
  if (!nutritionalValue) return null;
  return (
    <div className="border-y">
      <Collapsible>
        <CollapsibleTrigger className="py-3 group font-semibold text-[1.15rem] flex justify-between w-full items-center lg:text-[1.3rem]">
          Näringsvärde
          <ChevronDown className="size-5 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-8 pt-3">
          <div className="space-y-7 md:space-y-10">
            {nutritionalValue.calories && (
              <ProductNutritionItem
                label="Energi"
                value={`${Math.ceil(nutritionalValue.calories * 4.184)} kJ / ${nutritionalValue.calories} kcal`}
              />
            )}
            <ProductNutritionItem
              label="Fett"
              value={nutritionalValue.fat + "g"}
              comment={{
                label: "Varav mättat fett",
                value: nutritionalValue.saturated + "g",
              }}
            />
            <ProductNutritionItem
              label="Kolhydrat"
              value={nutritionalValue.carbohydrates + "g"}
              comment={{
                label: "varav sockerarter",
                value: nutritionalValue.sugars + "g",
              }}
            />
            <ProductNutritionItem
              label="Fiber"
              value={nutritionalValue.carbohydrates + "g"}
            />
            <ProductNutritionItem
              label="Protein"
              value={nutritionalValue.protein + "g"}
            />
            <ProductNutritionItem
              label="Salt"
              value={nutritionalValue.salt + "g"}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
