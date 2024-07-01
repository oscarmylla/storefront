import { CartSupplements } from "@/storefront/components/cart/supplement";
import { getCart } from "@/storefront/lib/shopify";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const cart = await getCart();
  if (!cart) return redirect("/");

  return <CartSupplements cart={cart} />;
}
