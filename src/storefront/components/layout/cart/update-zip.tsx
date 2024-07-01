"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/storefront/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "../../ui/button";
import { cn } from "@/storefront/lib/utils";
import { updateBuyerIdentity } from "@/storefront/actions/cart";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      variant="default"
      className="w-full"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span>Uppdatera</span>
      )}
    </Button>
  );
}

export function UpdateZip({ className }: { className?: string }) {
  const [message, formAction] = useFormState(updateBuyerIdentity, null);

  return (
    <>
      <form
        action={formAction}
        className={cn(
          "mt-4 flex flex-col items-center justify-center space-y-2 text-center",
          className
        )}
      >
        <div className="space-y-3">
          <InputOTP
            maxLength={5}
            pattern={REGEXP_ONLY_DIGITS}
            required
            name="zip"
            className="justify-center"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
            </InputOTPGroup>
          </InputOTP>
          <SubmitButton />
        </div>
        <p
          aria-live="polite"
          role="status"
          className="text-destructive text-sm"
        >
          {message?.errors.zip}
        </p>
      </form>
    </>
  );
}
