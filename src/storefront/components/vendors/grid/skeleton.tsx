import React from "react";

export function VendorsGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 container gap-3 md:gap-4">
      {[...Array(20)].map((index) => (
        <div key={index} className="space-y-2">
          <div className="aspect-video bg-gray-200 rounded-md animate-pulse" />
          <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse" />
        </div>
      ))}
    </div>
  );
}
