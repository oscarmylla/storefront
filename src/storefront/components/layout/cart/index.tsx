import { CartSheet } from "./sheet";
import { getCart } from "../../../lib/shopify";

export async function Cart() {
  const cart = await getCart();

  return <CartSheet cart={cart} />;
}
