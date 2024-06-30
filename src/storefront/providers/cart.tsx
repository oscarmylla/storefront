"use client";

import { createContext, useContext } from "react";
import { Cart } from "../lib/shopify/types";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../lib/shopify";
import { TAGS } from "../lib/constants";

const CartContext = createContext<Cart | undefined>(undefined);

export function useCart() {
  return useContext(CartContext);
}

export default function CartProvider({
  children,
  cart,
}: {
  children: React.ReactNode;
  cart?: Cart;
}) {
  // const { data, isFetching } = useQuery<Cart | undefined>({
  //   queryKey: [TAGS.cart],
  //   queryFn: () => getCart(),
  // });

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}
