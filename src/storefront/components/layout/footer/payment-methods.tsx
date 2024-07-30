import { ApplePay } from "@/storefront/svgs/apple-pay";
import { GooglePay } from "@/storefront/svgs/google-pay";
import { Klarna } from "@/storefront/svgs/klarna";
import { Maestro } from "@/storefront/svgs/maestro";
import { Mastercard } from "@/storefront/svgs/mastercard";
import { ShopifyPay } from "@/storefront/svgs/shopify-pay";
import { Visa } from "@/storefront/svgs/visa";

export function PaymentMethods() {
  return (
    <ul className="flex gap-4">
      <li>
        <ApplePay className="size-8" />
      </li>
      <li>
        <GooglePay className="size-8" />
      </li>
      <li>
        <Klarna className="size-8" />
      </li>
      <li>
        <Maestro className="size-8" />
      </li>
      <li>
        <Mastercard className="size-8" />
      </li>
      <li>
        <ShopifyPay className="size-8" />
      </li>
      <li>
        <Visa className="size-8" />
      </li>
    </ul>
  );
}
