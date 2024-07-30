
import { developerClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextRequest } from "next/server";
import fs from "fs";
import { Vendor } from "@/sanity.types";
import { nanoid } from "nanoid";

type JSONVendor = {
   "slug": string,
   "name": string,
   "title": string,
   "text": string,
   "quote": string,
   "images": string[],
   "logo": string,
   "instagram": string,
   "facebook": string,
   "thumbnail": string,
}

function string_to_slug(str: string) {
   str = str.replace(/^\s+|\s+$/g, ''); // trim
   str = str.toLowerCase();

   // remove accents, swap ñ for n, etc
   var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
   var to = "aaaaeeeeiiiioooouuuunc------";
   for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
   }

   str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

   return str;
}


export async function POST(request: NextRequest) {
   const sanityVendors: Vendor[] = await developerClient.fetch(groq`*[_type == "vendor"]`)
   const vendors: JSONVendor[] = JSON.parse(fs.readFileSync("/Users/oscarpeyron/Documents/mylla/storefront/src/app/api/seed/vendor/vendors.json", "utf8"))

   for (const sanityVendor of sanityVendors) {
      if (sanityVendor.slug?.current) continue;
      if (!sanityVendor.name) continue;

      // const vendor = vendors.find((v) => v.name === sanityVendor.name)

      await developerClient
         .patch(sanityVendor._id)
         .set({
            slug: {
               _type: 'slug',
               current: string_to_slug(sanityVendor.name)
            }
         })
         .commit()

      // if (vendor) {
      // const response = await fetch(vendor.logo);
      // const blob = await response.blob();
      // const file = new File([blob], vendor.logo.replace("https://cdn.shopify.com/s/files/1/0264/0216/0688/files/", "").split("?")[0]!, { type: blob.type, lastModified: new Date().getTime() });

      // await developerClient.assets
      //    .upload('image', file)
      //    .then((document) => {
      //       console.log('The file was uploaded!', document)
      //       return developerClient
      //          .patch(sanityVendor._id)
      //          .set({
      //             blog: {
      //                ...sanityVendor.blog,
      //                logo: {
      //                   _type: 'image',
      //                   asset: {
      //                      _type: 'reference',
      //                      _ref: document._id
      //                   }
      //                }
      //             }
      //          })
      //          .commit()
      //    })
      //    .catch((error) => {
      //       console.error('Upload failed:', error.message)
      //    })
      // }

   }

   return Response.json({})
}