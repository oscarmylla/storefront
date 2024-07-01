"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/storefront/components/ui/button";
import { updateBuyerIdentity } from "@/storefront/actions/cart";

function SubmitButton({ zip }: { zip: string | undefined }) {
  const { pending } = useFormStatus();

  if (!zip) {
    return (
      <Button disabled variant="outline" className="min-w-56">
        Fyll i postnummer
      </Button>
    );
  }

  return (
    <Button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      variant="outline"
      className="min-w-56"
      disabled={pending}
      size="sm"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span>Byt postnummer</span>
      )}
    </Button>
  );
}

export function DeleteZip({ className }: { className?: string }) {
  const [message, formAction] = useFormState(updateBuyerIdentity, null);

  return (
    <>
      <form action={formAction} className={className}>
        <input type="hidden" name="zip" value="" />
        <SubmitButton zip="1" />
        <p aria-live="polite" className="sr-only" role="status">
          {message?.errors?.zip}
        </p>
      </form>
    </>
  );
}
