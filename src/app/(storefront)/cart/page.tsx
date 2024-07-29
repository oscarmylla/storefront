import { getCart } from "@/storefront/lib/shopify";
import { redirect } from "next/navigation";
import Cart from "@/storefront/components/cart";

export default async function CartPage() {
  const cart = await getCart();

  if (!cart) return redirect("/");

  if (parseInt(cart.cost.subtotalAmount.amount) < 500) {
    return redirect("/");
  }

  return <Cart cart={cart} />;
}
