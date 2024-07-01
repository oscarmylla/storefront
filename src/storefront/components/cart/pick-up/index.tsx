"use client";

import { PickupLocationsForm } from "./locations-form";
import { useState } from "react";
import { PickupDatesForm } from "./dates-form";
import { PickupTimesForm } from "./times-form";
import { PickupCheckoutForm } from "./checkout-form";
import { format } from "date-fns";
import { Cart } from "@/storefront/lib/shopify/types";
import { PickupLocation } from "@/storefront/types/zapiet";

export default function Pickup({ cart }: { cart: Cart }) {
  const [location, setLocation] = useState<PickupLocation>();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>();

  return (
    <div className="space-y-6">
      <PickupLocationsForm
        location={location}
        setLocation={setLocation}
        reset={() => {
          setLocation(undefined);
          setDate(undefined);
          setTime(undefined);
        }}
      />
      {location ? (
        <PickupDatesForm
          location={location}
          setDate={setDate}
          reset={() => {
            setTime(undefined);
          }}
        />
      ) : null}
      {location && date ? (
        <PickupTimesForm
          date={date}
          location={location}
          key={date.toString()}
          setTime={setTime}
        />
      ) : null}
      <PickupCheckoutForm
        time={time}
        location={location}
        date={date ? format(date, "yyyy/MM/dd") : undefined}
        cart={cart}
      />
    </div>
  );
}
