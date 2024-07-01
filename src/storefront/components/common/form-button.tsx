"use client";

import { useFormState } from "react-hook-form";
import { Button, ButtonProps } from "@/storefront/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/storefront/lib/utils";

export function FormButton({
  children,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const formState = useFormState();

  const { isLoading, isValidating, isSubmitting, errors } = formState;

  const isValid = Object.keys(errors).length === 0;

  const loadingState = isLoading || isSubmitting;
  const isDisabled = loadingState || isValidating || !isValid;
  const disabledState =
    disabled !== undefined ? disabled || isDisabled : isDisabled;

  return (
    <Button
      type="submit"
      disabled={disabledState}
      {...props}
      className={cn("gap-2", className)}
    >
      {loadingState ? <Loader2 className="size-5 animate-spin" /> : null}
      <span>{children}</span>
    </Button>
  );
}
