import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string, remove?: string[]) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      if (remove) {
        remove.forEach((param) => {
          params.delete(param);
        });
      }

      return params.toString();
    },
    [searchParams]
  );

  const setQueryParams = (name: string, value: string, remove?: string[]) => {
    const query = createQueryString(name, value, remove);
    router.push(`${pathname}?${query}`);
  };

  return { setQueryParams };
};
