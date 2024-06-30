import React from "react";
import Navbar from "../navbar";

export function Header() {
  return (
    <header className="sticky top-0 bg-background z-30">
      <Navbar />
    </header>
  );
}
