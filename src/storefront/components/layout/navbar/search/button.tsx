import { SearchIcon } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

export function SearchButton({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="relative lg:max-w-lg flex-1">
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-full"
      >
        Sök efter produkter...
      </button>
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <SearchIcon className="size-4" />
      </div>
    </div>
  );
}
