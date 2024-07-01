"use client";

import { Calendar } from "@/storefront/components/ui/calendar";
import { cn, fetcher } from "@/storefront/lib/utils";
import { sv } from "date-fns/locale";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/storefront/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/storefront/components/ui/button";
import { Skeleton } from "@/storefront/components/ui/skeleton";
import { DeliveryDates, DeliveryLocation } from "@/storefront/types/zapiet";
import { Cart } from "@/storefront/lib/shopify/types";
import { CalendarIcon } from "lucide-react";
import { FormButton } from "../../common/form-button";

const FormSchema = z.object({
  date: z.date({
    required_error: "Välj ett datum för leverans.",
  }),
});

export function DeliveryDatesForm({
  location,
  cart,
  setDate,
  reset,
}: {
  location: DeliveryLocation;
  cart: Cart;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  reset: () => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof FormSchema>) => {
      setDate(values.date);
    },
    [setDate]
  );

  const { data, isLoading, isValidating } = useSWR<DeliveryDates, Error>(
    `/api/zapiet/delivery/dates?locationId=${location.id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
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

  console.log(data.disabled);

  const disabledDates = data.disabled.reduce((acc: any, item: any) => {
    if (Array.isArray(item)) {
      const date = new Date(item[0], item[1], item[2]);
      acc.push(date);
    } else {
      const daysOfWeekObj = acc.find((obj: any) =>
        obj.hasOwnProperty("dayOfWeek")
      );
      if (daysOfWeekObj) {
        daysOfWeekObj.dayOfWeek.push(item - 1);
      } else {
        acc.push({ dayOfWeek: [item - 1] });
      }
    }
    return acc;
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="self-start">Datum för leverans</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", {
                          locale: sv,
                        })
                      ) : (
                        <span>Välj ett datum</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    selected={field.value}
                    onSelect={(value) => {
                      field.onChange(value);
                      setOpen(false);
                    }}
                    initialFocus
                    mode="single"
                    className="rounded-md border shadow"
                    // locale={sv}
                    // ISOWeek={true}
                    disabled={[
                      ...disabledDates,
                      {
                        before: data.minDate ? new Date(data.minDate) : null,
                        after: data.maxDate ? new Date(data.maxDate) : null,
                      },
                    ]}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Leveransdatum för din order.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton className="sr-only">Bekräfta</FormButton>
      </form>
    </Form>
  );
}
