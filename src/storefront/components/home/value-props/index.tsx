import { Carrot, MapPin, Tractor, Truck } from "lucide-react";
import { ValuePropItem } from "./item";

export type ValueProp = {
  title: string;
  content: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const items = [
  {
    title: "Mat i säsong",
    content: "Vi har inga stora lager och inga mellanhänder.",
    icon: Carrot,
  },
  {
    title: "Från Sverige",
    content: "Mat från svenska gårdar och mathantverkare.",
    icon: MapPin,
  },
  {
    title: "Smidig hemleverans",
    content: "Vi levererar direkt hem till 2,7 miljoner hushåll.",
    icon: Truck,
  },
  {
    title: "Mer till bonden",
    content: "Hos oss bestämmer bonden vad de ska ha betalt för sin mat.",
    icon: Tractor,
  },
];

export function ValueProps() {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-5 container lg:grid-cols-4 max-w-6xl py-8 md:py-16 md:pt-8">
      {items.map((item, index) => (
        <ValuePropItem key={index} {...item} />
      ))}
    </div>
  );
}
