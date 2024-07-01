"use client";

import useSWR from "swr";
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
import { Skeleton } from "@/storefront/components/ui/skeleton";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/storefront/components/ui/radio-group";
import { fetcher } from "@/storefront/lib/utils";
import {
  PickupLocation,
  ZapietPickupLocationsOperation,
} from "@/storefront/types/zapiet";
import { FormButton } from "../../common/form-button";

const FormSchema = z.object({
  location: z.string({
    required_error: "Vänligen välj en leveranstid.",
  }),
});

export function PickupLocationsForm({
  location,
  setLocation,
  reset,
}: {
  reset: () => void;
  location: PickupLocation | undefined;
  setLocation: Dispatch<SetStateAction<PickupLocation | undefined>>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data, isLoading, isValidating } = useSWR<
    ZapietPickupLocationsOperation,
    Error
  >(`/api/zapiet/pickup/locations`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof FormSchema>) => {
      const location = data?.locations.find(
        (location) => location.id.toString() === values.location
      );
      setLocation(location);
    },

    [setLocation, data?.locations]
  );

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      reset();
      form.handleSubmit(onSubmit)();
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit, reset]);

  if (isLoading || isValidating || !data) {
    return (
      <div className="w-[240px] space-y-3">
        <Skeleton className="h-2.5 w-44" />
        <Skeleton className="h-10 w-full" />
        <div className="space-y-1">
          <Skeleton className="h-2.5 w-44" />
          <Skeleton className="h-2.5 w-20" />
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Upphämtningsplats</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3 rounded-md border px-5 py-3"
                >
                  {data.locations.map((location) => (
                    <FormItem
                      key={location.id}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={location.id.toString()} />
                      </FormControl>
                      <FormLabel className="space-y-1.5 font-normal">
                        <span className="block">{location.company_name}</span>
                        <span className="block text-[0.8rem]">
                          {location.address_line_1}
                        </span>
                        <span className="block text-[0.8rem]">
                          {location.postal_code} {location.city}
                        </span>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Upphämtningsplats för din order.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton className="sr-only">Bekräfta</FormButton>
      </form>
    </Form>
  );
}
