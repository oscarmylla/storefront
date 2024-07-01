import React, { Suspense } from "react";
import { DeliveryMethod } from "./delivery-method";
import { Cart as CartType } from "../../lib/shopify/types";
import { OrderSummary } from "./order-summary";
import { CartRecommendations } from "./recommendations";

export default function Cart({ cart }: { cart: CartType }) {
  return (
    <div className="container pb-10 pt-3 md:pb-20 md:pt-8">
      <h1 className="mb-5 text-2xl md:mb-8 md:text-3xl">Varukorg</h1>
      <div className="mb-14 flex flex-col-reverse gap-4 md:mb-20 md:gap-10 lg:flex-row xl:gap-14">
        <DeliveryMethod cart={cart} />
        <OrderSummary cart={cart} />
      </div>
      <Suspense fallback={null}>
        <CartRecommendations />
      </Suspense>
    </div>
  );
}
