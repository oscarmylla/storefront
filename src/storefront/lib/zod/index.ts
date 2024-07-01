import { DeepMap, DeepPartial, FieldValues } from "react-hook-form";

export const getDirtyValues = <T extends FieldValues>(
   allFields: T,
   dirtyFields: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>
): Partial<T> => {
   const changedFieldValues = Object.keys(dirtyFields).reduce((acc, currentField) => {
      return {
         ...acc,
         [currentField]: allFields[currentField]
      }
   }, {} as Partial<T>);

   return changedFieldValues;
};