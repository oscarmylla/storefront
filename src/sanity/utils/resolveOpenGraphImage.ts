import { urlForImage } from "./urlForImage";

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
   if (!image) return;
   const url = urlForImage(image)?.width(1200).height(627).fit("crop").url();
   if (!url) return;
   return { url, alt: image?.alt as string, width, height };
}
