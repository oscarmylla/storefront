import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/storefront/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export function ProductNutrition() {
  return (
    <div className="border-y">
      <Collapsible>
        <CollapsibleTrigger className="py-3 group font-semibold text-[1.15rem] flex justify-between w-full items-center lg:text-[1.3rem]">
          Näringsvärde
          <ChevronDown className="size-5 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-8">
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
