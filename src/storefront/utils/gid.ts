import { ShopifyGid } from "@/storefront/lib/shopify/types";

export function generateGid(resource: string, resourceId: string): string {
   if (!resource || !resourceId) {
      throw new Error("Resource or resourceId is missing");
   }

   // Construct the GID URL string
   const gid = `gid://shopify/${resource}/${resourceId}`;

   return gid;
}

export function parseGid(gid: string | undefined): ShopifyGid {
   const defaultReturn: ShopifyGid = {
      id: '',
      resource: null,
      resourceId: null,
      search: '',
      searchParams: new URLSearchParams(),
      hash: '',
   };

   if (typeof gid !== 'string') {
      return defaultReturn;
   }

   try {
      const { search, searchParams, pathname, hash } = new URL(gid);
      const pathnameParts = pathname.split('/');
      const lastPathnamePart = pathnameParts[pathnameParts.length - 1];
      const resourcePart = pathnameParts[pathnameParts.length - 2];

      if (!lastPathnamePart || !resourcePart) {
         return defaultReturn;
      }

      const id = `${lastPathnamePart}${search}${hash}` || '';
      const resourceId = lastPathnamePart || null;
      const resource = resourcePart ?? null;

      return { id, resource, resourceId, search, searchParams, hash };
   } catch {
      return defaultReturn;
   }
}