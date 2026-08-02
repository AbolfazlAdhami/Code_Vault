import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormErrorType = FieldError | Merge<FieldError, FieldErrorsImpl<any>> | Error | string | undefined | null;

export default function FormError({ error }: { error: FormErrorType }) {
  if (!error) return null;

  if (typeof error === "string") {
    return <p className="mt-1 text-red-500">{error}</p>;
  }

  return <p className="mt-1 text-red-500">{error.message?.toString()}</p>;
}
