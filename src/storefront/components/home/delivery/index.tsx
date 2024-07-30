import { DeliveryForm } from "./form";

export function Delivery() {
  return (
    <div className="container my-8 md:my-16">
      <div className="bg-primary text-accent rounded-md py-16 px-5 md:py-12 lg:py-28 text-center flex flex-col items-center">
        <h2 className="font-semibold text-3xl lg:text-4xl leading-none max-w-96 sm:max-w-none">
          Kolla om vi levererar hem till dig
        </h2>
        <p className="text-lg leading-tight max-w-lg mt-3">
          På Mylla säljer mer än 100 lokala bönder och mathantverkare direkt
          till 2,7 miljoner svenska hushåll.
        </p>
        <DeliveryForm />
      </div>
    </div>
  );
}
