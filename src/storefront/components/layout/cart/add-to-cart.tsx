"use client";

import { Money, ProductVariant } from "../../../lib/shopify/types";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/storefront/components/ui/button";
import { useFieldArray, useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/storefront/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormButton } from "../../common/form-button";
import { cn } from "@/storefront/lib/utils";
import {
  AddToCartFormSchema,
  AddToCartFormValues,
} from "@/storefront/lib/zod/shopify";
import { addItem } from "@/storefront/actions/cart";
import { setForm } from "@/storefront/lib/form";
import { Input } from "../../ui/input";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  size,
  children,
  variant = "secondary",
  className,
  loading,
  price,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  size?: VariantProps<typeof buttonVariants>["size"];
  variant?: VariantProps<typeof buttonVariants>["variant"];
  children: React.ReactNode;
  className?: string;
  loading: boolean;
  price: Money;
}) {
  const { isSubmitting, isValid } = useFormState();

  if (!availableForSale) {
    return (
      <FormButton
        disabled
        variant={variant}
        className={cn("flex-1 basis-96", className)}
        size={size}
        type="submit"
      >
        Slutsåld
        {children}
      </FormButton>
    );
  }

  if (!selectedVariantId) {
    return (
      <FormButton
        disabled
        variant={variant}
        className={cn("flex-1 basis-96", className)}
        size={size}
      >
        Välj variant
        {children}
      </FormButton>
    );
  }

  return (
    <FormButton
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (loading) return e.preventDefault();
      }}
      disabled={!isValid || isSubmitting}
      variant={variant}
      className={cn("flex-1 basis-96", className)}
      size={size}
    >
      <span>Lägg i varukorgen</span>
      {children}
    </FormButton>
  );
}

export function AddToCart({
  variant,
  className,
  buttonClassName,
  size,
  children,
  buttonVariant = "secondary",
}: {
  variant: ProductVariant;
  className?: string;
  buttonClassName?: string;
  size?: VariantProps<typeof buttonVariants>["size"];
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
  children?: React.ReactNode;
}) {
  const { availableForSale, id, price } = variant;
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(AddToCartFormSchema),
    mode: "onChange",
    defaultValues: {
      items: [{ id: id, quantity: 1 }],
    },
  });

  const { fields, append } = useFieldArray({
    name: "items",
    control: form.control,
  });

  async function onSubmit(values: AddToCartFormValues) {
    const res = await addItem(values.items[0].id);
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-wrap gap-2 space-y-2", className)}
      >
        <div className="hidden shrink-0 grow basis-1">
          {fields.map((field, index) => (
            <div key={field.id}>
              <FormField
                control={form.control}
                name={`items.${index}.id`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Produktid</FormLabel>
                    <FormDescription className="sr-only">
                      Produktid
                    </FormDescription>
                    <FormControl>
                      <Input {...field} className="hidden" type="hidden" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Kvantitet</FormLabel>
                    <FormDescription className="sr-only">
                      Kvantitet
                    </FormDescription>
                    <FormControl>
                      <div className="flex">
                        <Button
                          disabled={field.value <= 0}
                          onClick={() =>
                            form.setValue(
                              `items.${index}.quantity`,
                              +field.value - 1
                            )
                          }
                          type="button"
                        >
                          -
                        </Button>
                        <Input {...field} className="min-w-10 text-center" />
                        <Button
                          type="button"
                          onClick={() =>
                            form.setValue(
                              `items.${index}.quantity`,
                              +field.value + 1
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
        <SubmitButton
          availableForSale={availableForSale}
          selectedVariantId={id}
          size={size}
          variant={buttonVariant}
          className={buttonClassName}
          loading={isSubmitting}
          price={price}
        >
          {children}
        </SubmitButton>
      </form>
    </Form>
  );
}
