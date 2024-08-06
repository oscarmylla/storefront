import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { editSearchParams } from "../utils/edit-search-params";

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(editSearchParams, [searchParams]);

  const setQueryParams = (name: string, value: string, remove?: string[]) => {
    const query = createQueryString(searchParams, name, value, remove);
    router.push(`${pathname}?${query}`);
  };

  return { setQueryParams };
};
