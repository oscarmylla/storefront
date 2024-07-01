import { FormErrors } from '@/storefront/types/form';
import { FieldPath, FieldValues } from 'react-hook-form';
import { AnyZodObject, ZodType } from 'zod';

export function validateForm<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(schema: ZodType<TFieldValues>, values: TFieldValues): { data?: ZodType<TFieldValues>['_output'], errors?: FormErrors<ZodType<TFieldValues>['_input']> } {
   const result = schema.safeParse(values);

   if (!result.success) {
      let errors: FormErrors<ZodType<TFieldValues>['_input']> = {};
      result.error.issues.forEach(issue => {
         errors = { ...errors, [issue.path[0]]: issue.message }
      })

      return { errors };
   }

   return { data: result.data };
}