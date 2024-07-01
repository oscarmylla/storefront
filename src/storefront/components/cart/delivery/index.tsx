"use client";

import { DeliveryLocationsForm } from "./locations-form";
import { useState } from "react";
import { DeliveryDatesForm } from "./dates-form";
import { DeliveryTimesForm } from "./times-form";
import { DeliveryLocation, DeliveryTime } from "@/storefront/types/zapiet";
import { DeliveryCheckoutForm } from "./checkout-form";
import { format } from "date-fns";
import { Cart } from "@/storefront/lib/shopify/types";

export default function Delivery({ cart }: { cart: Cart }) {
  const [geoSearchQuery, setGeoSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<DeliveryLocation | undefined>();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<DeliveryTime | undefined>();

  return (
    <div className="space-y-6">
      <DeliveryLocationsForm
        location={location}
        setLocation={setLocation}
        setGeoSearchQuery={setGeoSearchQuery}
        reset={() => {
          setLocation(undefined);
          setDate(undefined);
          setTime(undefined);
        }}
        cart={cart}
      />
      {location ? (
        <DeliveryDatesForm
          location={location}
          cart={cart}
          setDate={setDate}
          reset={() => {
            setTime(undefined);
          }}
        />
      ) : null}
      {location && date ? (
        <DeliveryTimesForm
          date={date}
          location={location}
          key={date.toString()}
          setTime={setTime}
        />
      ) : null}
      <DeliveryCheckoutForm
        time={time}
        location={location}
        date={date ? format(date, "yyyy/MM/dd") : undefined}
        geoSearchQuery={geoSearchQuery}
        cart={cart}
      />
    </div>
  );
}
