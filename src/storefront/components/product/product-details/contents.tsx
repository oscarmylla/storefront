import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/storefront/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const CONTENTS = [
  {
    title: "Beskrivning",
    content:
      "Oxfilé från korsningen Hereford/Angus, från Malma Gård, en EU-Ekologisk gård på Värmdö i Stockholm skärgård.",
  },
  {
    title: "Leveransdagar",
    content: "Alla dagar",
  },
  {
    title: "Storlek",
    content: "ca 900",
  },
  {
    title: "Varierande vikt",
    content:
      "Varan varierar i vikt och storlek. Priset justeras baserat på den faktiska vikten på leveransdagen.",
  },
  {
    title: "Ingredienser",
    content: "Nötkött",
  },
  {
    title: "Ursprung",
    content: "Sverige",
  },
  {
    title: "Egenskaper",
    content: "Ekologisk",
  },
];

export function ProductContents() {
  return (
    <div className="border-t">
      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger className="py-3 group font-semibold text-[1.15rem] flex justify-between w-full items-center lg:text-[1.3rem]">
          Innehåll
          <ChevronDown className="size-5 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-8 pt-3">
          <div className="space-y-7 md:space-y-10">
            {CONTENTS.map((content) => (
              <ProductContentItem key={content.title} {...content} />
            ))}
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
  content: string;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:gap-10">
      <h2 className="text-[0.95rem] font-semibold md:basis-[10rem] shrink-0">
        {title}
      </h2>
      <p>{content}</p>
    </div>
  );
}
