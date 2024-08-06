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
import { Input } from "@/storefront/components/ui/input";
import { JSONProduct } from "./page";
import { Textarea } from "@/storefront/components/ui/textarea";
import { Product } from "@/sanity.types";
import { toast } from "@/storefront/components/ui/use-toast";

export const FormSchema = z.object({
  origin: z.object({
    country: z.string().optional(),
    city: z.string().optional(),
  }),
  description: z.string(),
  tradeName: z.string().optional(),
  size: z.string().optional(),
  packaging: z.string().optional(),
  storage: z.string().optional(),
  usage: z.string().optional(),
  ingredients: z.string().optional(),
  labels: z.string().optional(),
  nutritionalValue: z.object({
    calories: z.coerce.number().or(z.nan()).optional(),
    fiber: z.coerce.number().or(z.nan()).optional(),
    protein: z.coerce.number().or(z.nan()).optional(),
    carbohydrates: z.coerce.number().or(z.nan()).optional(),
    sugars: z.coerce.number().or(z.nan()).optional(),
    fat: z.coerce.number().or(z.nan()).optional(),
    saturated: z.coerce.number().or(z.nan()).optional(),
    salt: z.coerce.number().or(z.nan()).optional(),
    other: z.string().optional(),
  }),
  allergens: z.string().optional(),
  other: z.string().optional(),
});

export function SeedProductForm({
  _id,
  product,
  handleSubmit,
}: {
  _id: string;
  product: Product;
  handleSubmit: (id: string, data: z.infer<typeof FormSchema>) => Promise<any>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tradeName: product.tradeName || "",
      origin: {
        country: product.origin?.country || "",
        city: product.origin?.city || "",
      },
      description: product.description || "",
      size: product.size || "",
      packaging: product.packaging || "",
      storage: product.storage || "",
      usage: "",
      ingredients: product.ingredients || "",
      labels: product.labels || "",
      nutritionalValue: {
        calories: product.nutritionalValue?.calories,
        fiber: product.nutritionalValue?.fiber,
        protein: product.nutritionalValue?.protein,
        carbohydrates: product.nutritionalValue?.carbohydrates,
        sugars: product.nutritionalValue?.sugars,
        fat: product.nutritionalValue?.fat,
        saturated: product.nutritionalValue?.saturated,
        salt: product.nutritionalValue?.salt,
        other: "",
      },
      allergens: product.allergens,
      other: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await handleSubmit(_id, data);
    toast({
      title: "Product updated",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beskrivning</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="origin.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land</FormLabel>
                <FormControl>
                  <Input placeholder="country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="origin.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stad</FormLabel>
                <FormControl>
                  <Input placeholder="city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="tradeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Namn</FormLabel>
              <FormControl>
                <Input placeholder="trade name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Storlek</FormLabel>
              <FormControl>
                <Input placeholder="size" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="packaging"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Förpackning</FormLabel>
              <FormControl>
                <Textarea placeholder="packaging" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="labels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Märkningar</FormLabel>
              <FormControl>
                <Input placeholder="labels" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Innehållsförteckning</FormLabel>
              <FormControl>
                <Textarea placeholder="ingredients" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="nutritionalValue.calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kcal</FormLabel>
                <FormControl>
                  <Input placeholder="calories" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nutritionalValue.fiber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fiber</FormLabel>
                <FormControl>
                  <Input placeholder="fiber" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="nutritionalValue.fat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fett</FormLabel>
                <FormControl>
                  <Input placeholder="fat" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nutritionalValue.saturated"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mättat</FormLabel>
                <FormControl>
                  <Input placeholder="saturated" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="nutritionalValue.carbohydrates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kolhydrater</FormLabel>
                <FormControl>
                  <Input placeholder="carbohydrates" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nutritionalValue.sugars"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Socker</FormLabel>
                <FormControl>
                  <Input placeholder="sugars" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="nutritionalValue.protein"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Protein</FormLabel>
                <FormControl>
                  <Input placeholder="protein" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nutritionalValue.salt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salt</FormLabel>
                <FormControl>
                  <Input placeholder="salt" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="nutritionalValue.other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Övrigt</FormLabel>
              <FormControl>
                <Textarea placeholder="other" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Förvaring</FormLabel>
              <FormControl>
                <Textarea placeholder="storage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="usage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Användning</FormLabel>
              <FormControl>
                <Textarea placeholder="usage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allergens"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergi</FormLabel>
              <FormControl>
                <Textarea placeholder="allergens" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other</FormLabel>
              <FormControl>
                <Textarea placeholder="other" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="sticky bottom-10">
          Submit
        </Button>
      </form>
    </Form>
  );
}
