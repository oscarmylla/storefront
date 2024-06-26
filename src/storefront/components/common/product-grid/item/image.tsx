import Image from "next/image";
import React from "react";

export function ProductGridItemImage({
  previewImageUrl,
  title,
}: {
  previewImageUrl?: string;
  title?: string;
}) {
  return (
    <div className="aspect-square relative rounded-md overflow-hidden rounded-b-none">
      {previewImageUrl ? (
        <Image
          src={previewImageUrl}
          alt={title ?? "Product image"}
          fill
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
