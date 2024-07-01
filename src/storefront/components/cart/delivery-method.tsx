import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/storefront/components/ui/tabs";
import PickUp from "./pick-up";
import Delivery from "./delivery";
import { Cart } from "../../lib/shopify/types";

export function DeliveryMethod({ cart }: { cart: Cart }) {
  const checkoutMethod = cart.attributes.find(
    (attr) => attr.key === "Checkout-Method"
  )?.value;
  return (
    <div className="space-y-3 md:space-y-5">
      <h2 className="text-xl md:text-2xl">Leverans</h2>
      <Tabs
        defaultValue={checkoutMethod ?? "delivery"}
        className="w-[400px] space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="delivery">Hemleverans</TabsTrigger>
          <TabsTrigger value="pickup">Upphämtning</TabsTrigger>
        </TabsList>
        <TabsContent value="delivery">
          <Delivery cart={cart} />
        </TabsContent>
        <TabsContent value="pickup">
          <PickUp cart={cart} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
