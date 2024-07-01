"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  UpdatePickupAttributesFormSchema,
  UpdatePickupAttributesFormValues,
} from "@/storefront/lib/zod/shopify";
import { PickupLocation } from "@/storefront/types/zapiet";
import { useRouter } from "next/navigation";
import { Cart } from "@/storefront/lib/shopify/types";
import { updateAttributes } from "@/storefront/actions/cart";
import { setForm } from "@/storefront/lib/form";
import { toast } from "sonner";
import { FormButton } from "../../common/form-button";

export function PickupCheckoutForm({
  location,
  date,
  time,
  cart,
}: {
  location?: PickupLocation | undefined;
  date?: string;
  time?: string;
  cart: Cart;
}) {
  const router = useRouter();
  const form = useForm<UpdatePickupAttributesFormValues>({
    resolver: zodResolver(UpdatePickupAttributesFormSchema),
    defaultValues: {
      checkoutMethod: "pickup",
      locationId: "",
      locationCompany: "",
      locationAdressLine1: "",
      locationAdressLine2: "",
      locationCity: "",
      locationRegion: "",
      locationPostalCode: "",
      locationCountry: "",
      pickupDate: "",
      pickupTime: "",
    },
  });

  useEffect(() => {
    form.setValue("locationId", location?.id.toString() ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue("locationCompany", location?.company_name ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue("locationAdressLine1", location?.address_line_1 ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue("locationAdressLine2", location?.address_line_2 ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue("locationCity", location?.city ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue("locationRegion", location?.region ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue("locationPostalCode", location?.postal_code ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue("locationCountry", location?.country ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue("pickupDate", date ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    form.setValue("pickupTime", time ?? "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  }, [location, date, time, form]);

  async function onSubmit(values: UpdatePickupAttributesFormValues) {
    const res = await updateAttributes(values);

    setForm({
      values,
      res,
      form,
      onSuccess: (res) => {
        if (res.data?.checkoutUrl) {
          const checkoutUrl =
            res.data?.checkoutUrl +
            "&" +
            new URLSearchParams({
              method: values.checkoutMethod,
              access_token:
                process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "",
              "checkout[shipping_address][company]":
                location?.company_name ?? "",
              "checkout[shipping_address][address1]":
                location?.address_line_1 ?? "",
              "checkout[shipping_address][address2]":
                location?.address_line_2 ?? "",
              "checkout[shipping_address][city]": location?.city ?? "",
              "checkout[shipping_address][country]": location?.country ?? "",
              "checkout[shipping_address][zip]": location?.postal_code ?? "",
              "checkout[shipping_address][province]": location?.region ?? "",
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
    <Form {...form} key={time}>
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
          name="locationCompany"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Företag</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">Företag.</FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="locationAdressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Adress</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">Adress.</FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locationAdressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Adress 2</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">Adress 2.</FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locationCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Stad</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">Stad.</FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locationRegion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Region</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">Region.</FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locationPostalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Postnummer</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">Postnummer.</FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locationCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Land</FormLabel>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              <FormDescription className="sr-only">Land.</FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pickupDate"
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
          name="pickupTime"
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
