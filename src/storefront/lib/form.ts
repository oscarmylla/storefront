
import { FieldPath, FieldValues, Path, UseFormProps, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { ErrorCallback, SuccessCallback, TResponse } from "../types/form";
import { getDirtyValues } from "./zod";

export function setForm<
   TFieldValues extends FieldValues = FieldValues,
   TData = TFieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ values, res, form, onError, onSuccess }: {
   values: TFieldValues,
   res: TResponse<TFieldValues, TData> | undefined,
   form: UseFormReturn<TFieldValues, any, undefined>,
   onError?: ErrorCallback<TFieldValues, TData>,
   onSuccess?: SuccessCallback<TFieldValues, TData>
}): void {
   if (!res) return;

   const dirtyValues = getDirtyValues(values, form.formState.dirtyFields);
   const defaultValues = form.formState.defaultValues as UseFormProps<TFieldValues, TName>["defaultValues"]

   const { errors } = res;
   if (errors && Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((fieldName) => {
         const errorMessage = errors[fieldName];

         if (fieldName.startsWith("root.") && !onError) {
            toast("Hoppsan! Något gick fel.", {
               description: errorMessage,
               action: {
                  label: "Stäng",
                  onClick: () => { },
               },
            });
         }

         form.setError(fieldName as TName, {
            type: "server",
            message: errorMessage,
         });
      });

      if (onError) {
         onError(res, form);
      }
   } else {
      let resetValues = { ...defaultValues }

      if (res.data) {
         Object.entries(res.data).forEach(([key, value]) => {
            if ((key in dirtyValues)) {
               resetValues = { ...resetValues, [key]: value ?? "" };
            }
         })

         form.reset(resetValues as TFieldValues);
      }

      if (onSuccess) {
         onSuccess(res, form);
      }
   }
}
