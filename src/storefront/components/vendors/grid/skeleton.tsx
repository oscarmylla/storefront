import React from "react";

export function VendorsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 container gap-x-3 md:gap-x-4 gap-y-6 md:gap-y-9">
      {[...Array(20)].map((_, index) => (
        <div key={index} className="space-y-1">
          <div className="aspect-[13/9] bg-gray-200 rounded-md animate-pulse" />
          <div className="w-full h-8 bg-gray-200 rounded-md animate-pulse" />
        </div>
      ))}
    </div>
  );
}
