export function formatZip(zip: string) {
   if (zip.length === 5) {
      return zip.substring(0, 3) + ' ' + zip.substring(3);
   }
   return zip;
}