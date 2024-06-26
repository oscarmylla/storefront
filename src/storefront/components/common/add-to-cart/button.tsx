import { cn } from "@/storefront/lib/utils";
import { Button, ButtonProps } from "../../ui/button";

export function AddToCartButton({ className, size, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      size={size}
      className={cn(
        "rounded-full gap-2",
        {
          "w-full md:w-auto lg:text-base lg:py-2 lg:px-6": size === "lg",
        },
        className
      )}
    />
  );
}
