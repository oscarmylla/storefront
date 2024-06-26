import React from "react";
import Navbar from "../navbar";
import { Separator } from "../../ui/separator";

export function Header() {
  return (
    <>
      <header className="sticky top-0 bg-background z-30">
        <Navbar />
      </header>
      <Separator className="h-2.5 bg-primary" />
    </>
  );
}
