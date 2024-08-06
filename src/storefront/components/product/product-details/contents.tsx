import { Category, Product, Vendor } from "@/sanity.types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/storefront/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export function ProductContents({
  product,
}: {
  product: Omit<Product, "vendor" | "categoryPath"> & {
    vendor: Vendor | null;
    categoryPath: Category[] | null;
  };
}) {
  const {
    origin,
    tradeName,
    usage,
    size,
    storage,
    labels,
    allergens,
    ingredients,
    vendor,
  } = product;
  return (
    <div className="border-t">
      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger className="py-3 group font-semibold text-[1.15rem] flex justify-between w-full items-center lg:text-[1.3rem]">
          Innehåll
          <ChevronDown className="size-5 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-8 pt-3">
          <div className="space-y-7 md:space-y-10">
            <ProductContentItem
              title="Innehållsförteckning"
              content={ingredients}
            />
            <ProductContentItem title="Producent" content={vendor?.name} />
            <ProductContentItem
              title="Ursprung"
              content={`${origin?.country}${origin?.city && " | " + origin?.city}`}
            />
            <ProductContentItem title="Storlek" content={size} />
            <ProductContentItem title="Användning" content={usage} />
            <ProductContentItem title="Förvaring" content={storage} />
            <ProductContentItem title="Märkningar" content={labels} />
            <ProductContentItem title="Allergener" content={allergens} />
            <ProductContentItem title="Produktnamn" content={tradeName} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function ProductContentItem({
  title,
  content,
}: {
  title: string;
  content?: string;
}) {
  if (!content) return null;

  return (
    <div className="flex flex-col gap-2 md:flex-row md:gap-10">
      <h2 className="text-[0.95rem] font-semibold md:basis-[10rem] shrink-0">
        {title}
      </h2>
      <p>{content}</p>
    </div>
  );
}
