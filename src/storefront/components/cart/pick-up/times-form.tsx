"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/storefront/components/ui/select";
import { fetcher } from "@/storefront/lib/utils";
import { format } from "date-fns";
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
  PickupLocation,
  ZapietPickupTimesOperation,
} from "@/storefront/types/zapiet";
import { Button } from "../../ui/button";

const FormSchema = z.object({
  time: z.string({
    required_error: "Vänligen välj en leveranstid.",
  }),
});

export function PickupTimesForm({
  location,
  date,
  setTime,
}: {
  location: PickupLocation;
  date: Date;
  setTime: Dispatch<SetStateAction<string | undefined>>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data, isLoading, isValidating } = useSWR<
    ZapietPickupTimesOperation,
    Error
  >(
    `/api/zapiet/pickup/times?locationId=${location.id}&date=${format(date, "yyyy-MM-dd")}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const onSubmit = useCallback(
    (values: z.infer<typeof FormSchema>) => {
      const time = data?.find((time) => time.id.toString() === values.time);
      if (!time) return;

      setTime(`${time.available_from} - ${time.available_until}`);
    },
    [setTime, data]
  );

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      form.handleSubmit(onSubmit)();
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

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

  const selectedTime = data.find(
    (time: any) => time.id.toString() === form.getValues("time")
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tid för upphämtning</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Välj upphämtningstid">
                      {selectedTime?.available_from}
                      {" - "}
                      {selectedTime?.available_until}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.map((time) => (
                    <SelectItem
                      value={time.id.toString()}
                      key={time.id.toString()}
                    >
                      {time.available_from} - {time.available_until}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Upphämtningstid för din order.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="sr-only">Bekräfta</Button>
      </form>
    </Form>
  );
}
