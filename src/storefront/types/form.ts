"use client"

import { FieldPath, FieldValues, Path, UseFormProps, UseFormReturn } from "react-hook-form";

export type FormErrors<TFieldValues extends FieldValues> = Partial<Record<keyof TFieldValues | `root.${string}`, string>>;

export type TResponse<
   TFieldValues extends FieldValues,
   TData = TFieldValues,
> = {
   errors?: FormErrors<TFieldValues>;
   data?: TData | null | undefined;
};

export type ErrorCallback<TFieldValues extends FieldValues, TData = TFieldValues> = (
   res: TResponse<TFieldValues, TData>,
   form: UseFormReturn<TFieldValues, any, undefined>
) => void;

export type SuccessCallback<TFieldValues extends FieldValues, TData = TFieldValues> = (
   res: TResponse<TFieldValues, TData>,
   form: UseFormReturn<TFieldValues, any, undefined>
) => void;