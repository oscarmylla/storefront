import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/images/home/hero.jpg";
import { Button } from "../../ui/button";

export function Hero() {
  return (
    <div className="relative bg-gradient-to-t from-primary/60 to-primary/20">
      <Image
        src={heroImage}
        alt="Köp närproducerad mat online från hundratals svenska bönder med smidig hemleverans."
        fill
        className="object-cover -z-10"
      />
      <div className="py-8 min-h-[500px] flex flex-col items-center justify-center text-accent text-center container md:min-h-[550px]">
        <h1 className="text-4xl font-bold mb-3 md:text-6xl max-w-96 md:max-w-xl xl:max-w-none">
          Direkt från bonden hem till dig
        </h1>
        <p className="font-medium text-xl mb-8 md:text-2xl md:max-w-2xl">
          Köp närproducerad mat online från hundratals svenska bönder med smidig
          hemleverans.
        </p>
        <Button className="rounded-full" asChild variant="secondary" size="lg">
          <Link href="/categories">Utforska sortimentet</Link>
        </Button>
      </div>
    </div>
  );
}
