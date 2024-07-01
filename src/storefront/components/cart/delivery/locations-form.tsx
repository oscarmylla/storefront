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
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/storefront/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Skeleton } from "@/storefront/components/ui/skeleton";
import { toast } from "sonner";
import { DeliveryLocation } from "@/storefront/types/zapiet";
import { Cart } from "@/storefront/lib/shopify/types";
import { getDeliveryLocations } from "@/storefront/actions/zapiet";
import { Button } from "../../ui/button";
import { FormButton } from "../../common/form-button";

const formSchema = z.object({
  geoSearchQuery: z.string(),
});

export function DeliveryLocationsForm({
  location,
  setLocation,
  setGeoSearchQuery,
  reset,
  cart,
}: {
  location?: DeliveryLocation;
  setLocation: Dispatch<SetStateAction<DeliveryLocation | undefined>>;
  setGeoSearchQuery: Dispatch<SetStateAction<string>>;
  cart: Cart;
  reset: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      geoSearchQuery:
        cart.buyerIdentity.deliveryAddressPreferences?.[0]?.zip?.replace(
          " ",
          ""
        ),
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const data = await getDeliveryLocations(cart, values.geoSearchQuery);
      if (data && !data.error) {
        setLocation(data);
        setGeoSearchQuery(values.geoSearchQuery);
      } else if (data.error) {
        form.setError("geoSearchQuery", {
          type: "manual",
          message: "Inga leveransplatser hittades för detta postnummer.",
        });
      } else {
        toast("Hoppsan!", {
          description: "Något gick fel vid kontroll av postnummer.",
          action: {
            label: "Stäng",
            onClick: () => {},
          },
        });
      }
    },
    [cart, setLocation, form, setGeoSearchQuery]
  );

  useEffect(() => {
    if (form.formState.defaultValues?.geoSearchQuery?.length === 5) {
      form.handleSubmit(onSubmit)();
    }
  }, [form, onSubmit]);

  const { formState } = form;
  const { isSubmitting, isLoading } = formState;

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (value.geoSearchQuery?.length === 5) {
        form.handleSubmit(onSubmit)();
      }

      if (location) {
        reset();
      }
    });
    return () => subscription.unsubscribe();
  }, [form, reset, location, onSubmit]);

  useEffect(() => {
    const cartPostalCode =
      cart.buyerIdentity.deliveryAddressPreferences?.[0]?.zip;

    if (cartPostalCode) {
      form.setValue("geoSearchQuery", cartPostalCode.replace(" ", ""), {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
    } else if (cartPostalCode === null) {
      form.setValue("geoSearchQuery", "", {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [cart, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="geoSearchQuery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postnummer</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  pattern={REGEXP_ONLY_DIGITS}
                  className="relative"
                  autoComplete="off"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Postnummer dit din order ska levereras.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isSubmitting || isLoading ? (
          <div className="w-[240px] space-y-3">
            <Skeleton className="h-2.5 w-44" />
            <Skeleton className="h-10 w-full" />
            <div className="space-y-1">
              <Skeleton className="h-2.5 w-44" />
              <Skeleton className="h-2.5 w-20" />
            </div>
          </div>
        ) : null}

        <FormButton className="sr-only">Bekräfta</FormButton>
      </form>
    </Form>
  );
}
