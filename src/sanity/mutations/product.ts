import { ShopifyWebhookOrder } from "@/storefront/lib/shopify/types";
import { developerClient } from "../lib/client";

export async function incrementProductSales(body: ShopifyWebhookOrder | undefined) {
   if (!body) return;

   const productIncrements = new Map<string, number>()

   for (const lineItem of body.line_items) {
      const productId = lineItem.product_id.toString();

      if (!productId) continue;

      const productQuantity = lineItem.quantity;
      const currentCount = productIncrements.get(productId) || 0;

      productIncrements.set(productId, currentCount + productQuantity);
   }

   for (const [productId, increment] of productIncrements) {
      const document = await developerClient.getDocument(`shopifyProduct-${productId}`);

      if (!document) {
         console.log(`Webhook shopify/order/create: Document not found for ${productId}`)
         continue
      };

      if (document.sales) {
         await developerClient.patch(document._id).inc({ sales: increment }).commit()
         console.log(`Webhook shopify/order/create: Sales incremented by ${increment} for ${document._id}`)
      } else {
         await developerClient.patch(document._id).set({ sales: increment }).commit()
         console.log(`Webhook shopify/order/create: Sales set to ${increment} for ${document._id}`)
      }
   }
}