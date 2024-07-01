import { z } from "zod";

export const AddToCartFormSchema = z.object({
   items: z
      .array(
         z.object({
            id: z.string().min(1, { message: "Ogiltigt id" }),
            quantity: z.coerce.number().int().min(0, { message: "Kvantitet måste vara högre eller lika med noll." }),
         })
      )
})

export type AddToCartFormValues = z.infer<typeof AddToCartFormSchema>;

export const UpdatePickupAttributesFormSchema = z.object({
   checkoutMethod: z.enum(["pickup"]),
   locationId: z.string().min(1),
   locationCompany: z.string().min(1),
   locationAdressLine1: z.string().min(1),
   locationAdressLine2: z.string(),
   locationCity: z.string().min(1),
   locationRegion: z.string(),
   locationPostalCode: z.string(),
   locationCountry: z.string(),
   pickupDate: z.string().min(1),
   pickupTime: z.string().min(1),
})

export type UpdatePickupAttributesFormValues = z.infer<typeof UpdatePickupAttributesFormSchema>;

export const UpdateDeliveryAttributesFormSchema = z.object({
   checkoutMethod: z.enum(["delivery"]),
   locationId: z.string().min(1),
   deliverySlotId: z.string().min(1),
   deliveryDay: z.string().min(1),
   deliveryDate: z.string().min(1),
   deliveryTime: z.string().min(1),
})

export type UpdateDeliveryAttributesFormValues = z.infer<typeof UpdateDeliveryAttributesFormSchema>;


export const UpdateBuyerIdentitySchema = z.object({
   zip: z.string({
      invalid_type_error: 'Ogiltigt postnummer',
      required_error: 'Postnummer saknas',
   })
})


export type UpdateBuyerIdentityFormValues = z.infer<typeof UpdateBuyerIdentitySchema>;