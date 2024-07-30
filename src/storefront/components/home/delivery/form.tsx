"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/storefront/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/storefront/components/ui/form";
import { Input } from "../../ui/input";

const FormSchema = z.object({
  geoSearchQuery: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function DeliveryForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      geoSearchQuery: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-96 mt-7 flex flex-col justify-center gap-2 sm:flex-row"
      >
        <FormField
          control={form.control}
          name="geoSearchQuery"
          render={({ field }) => (
            <FormItem className="space-y-0 flex-1">
              <FormLabel className="sr-only">Postnummer</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mitt postnummer är..."
                  {...field}
                  className="h-11 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="px-7 bg-background text-base"
        >
          Sök
        </Button>
      </form>
    </Form>
  );
}
