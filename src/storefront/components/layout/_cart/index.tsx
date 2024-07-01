import { getCart } from "@/storefront/lib/shopify";
import CartModal from "./modal";

export default async function Cart() {
  const cart = await getCart();

  return <CartModal cart={cart} />;
}
