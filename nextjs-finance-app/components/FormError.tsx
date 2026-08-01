import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export default function FormError({ error }: { error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined }) {
  return error && <p className="mt-1 text-red-500">{error.message}</p>;
}
