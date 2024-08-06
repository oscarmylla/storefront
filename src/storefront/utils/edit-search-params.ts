import { ReadonlyURLSearchParams } from "next/navigation";

export function editSearchParams(
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string,
  remove?: string[]
) {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  if (remove) {
    remove.forEach((param) => {
      params.delete(param);
    });
  }

  return params.toString();
}
