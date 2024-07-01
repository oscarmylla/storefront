"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/storefront/components/ui/form";
import { Input } from "@/storefront/components/ui/input";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DeliveryLocation, DeliveryTime } from "@/storefront/types/zapiet";
import { Cart } from "@/storefront/lib/shopify/types";
import {
  UpdateDeliveryAttributesFormSchema,
  UpdateDeliveryAttributesFormValues,
} from "@/storefront/lib/zod/shopify";
import { updateAttributes } from "@/storefront/actions/cart";
import { setForm } from "@/storefront/lib/form";
import { FormButton } from "../../common/form-button";

export function DeliveryCheckoutForm({
  location,
  date,
  time,
  geoSearchQuery,
  cart,
}: {
  geoSearchQuery: string;
  location: DeliveryLocation | undefined;
  date?: string;
  time?: DeliveryTime;
  cart: Cart;
}) {
  const router = useRouter();
  const form = useForm<UpdateDeliveryAttributesFormValues>({
    resolver: zodResolver(UpdateDeliveryAttributesFormSchema),
    defaultValues: {
      checkoutMethod: "delivery",
      locationId: "",
      deliverySlotId: "",
      deliveryDay: "",
      deliveryDate: "",
      deliveryTime: "",
    },
  });

  useEffect(() => {
    form.setValue("locationId", location?.id.toString() ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue("deliveryDate", date ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue(
      "deliveryTime",
      time ? `${time.available_from} - ${time.available_until}` : "",
      {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      }
    );

    form.setValue("deliveryDay", time?.day_of_week ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue("deliverySlotId", time?.id.toString() ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  }, [location, date, time, form]);

  async function onSubmit(values: UpdateDeliveryAttributesFormValues) {
    const res = await updateAttributes(values);

    setForm({
      values,
      res,
      form,
      onSuccess: (res) => {
        if (res.data?.checkoutUrl) {
          const checkoutUrl =
            res.data.checkoutUrl +
            "&" +
            new URLSearchParams({
              method: values.checkoutMethod,
              access_token:
                process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "",
              "checkout[shipping_address][company]": "",
              "checkout[shipping_address][address1]": "",
              "checkout[shipping_address][address2]": "",
              "checkout[shipping_address][city]": "",
              "checkout[shipping_address][country]": location?.country ?? "",
              "checkout[shipping_address][zip]": geoSearchQuery ?? "",
              "checkout[shipping_address][province]": "",
              skip_shopify_pay: "true",
              discount: "",
              locale: "sv",
              step: "contact_information",
            });

          router.push(checkoutUrl);
        }
      },
      onError: (res) => {
        const { errors } = res;

        if (errors) {
          toast("Hoppsan!", {
            description: "Något gick fel när du skulle till kassan.",
            action: {
              label: "Uppdatera sidan",
              onClick: () => router.refresh(),
            },
          });
        }
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="checkoutMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Leveransmetod</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">
                Leveransmetod.
              </FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="locationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Leveransställe</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">
                Leveransställe.
              </FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliverySlotId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Leveranslucka</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">
                Leveranslucka.
              </FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Veckodag</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">Veckodag.</FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Datum</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">Datum.</FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Tid</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">Tid.</FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />

        <FormButton>Till kassan</FormButton>
      </form>
    </Form>
  );
}
