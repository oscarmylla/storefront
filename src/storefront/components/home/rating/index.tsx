import { TrustpilotLogo } from "@/storefront/svgs/trustpilot";
import { TrustpilotStarsIcon } from "@/storefront/svgs/trustpilot-stars";
import React from "react";

export function Rating() {
  return (
    <div className="my-8 text-center space-y-4 container md:my-16">
      <h2 className="text-3xl font-semibold">Sveriges nöjdaste matälskare!</h2>
      <div className="sm:flex sm:justify-center sm:items-center sm:gap-3 space-y-1.5 sm:space-y-0">
        <div className="flex justify-center items-center gap-3">
          <span className="font-semibold text-xl">Utmärkt</span>
          <TrustpilotStarsIcon className="w-28" />
        </div>
        <div className="flex justify-center items-center gap-3">
          <span className="font-medium">1 253 omdömne på</span>
          <TrustpilotLogo className="w-20" />
        </div>
      </div>
    </div>
  );
}
