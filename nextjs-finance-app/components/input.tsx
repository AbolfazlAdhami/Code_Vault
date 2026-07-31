import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ type = "text", className = "", ...props }, ref) {
  const styles = {
    checkbox: `
      h-5 w-5
      cursor-pointer
      appearance-none
      rounded-md
      border border-gray-300
      bg-white
      shadow-sm
      transition-all duration-200 ease-in-out

      checked:border-gray-900
      checked:bg-gray-900

      hover:border-gray-400
      focus:outline-none
      focus:ring-2
      focus:ring-gray-900/20
      focus:ring-offset-1

      dark:border-gray-700
      dark:bg-gray-950
      dark:checked:border-white
      dark:checked:bg-white
      dark:focus:ring-white/20

      disabled:cursor-not-allowed
      disabled:opacity-50
    `,

    file: `
      w-full
      cursor-pointer
      rounded-xl
      border border-dashed border-gray-300
      bg-gray-50
      px-4 py-3
      text-sm text-gray-700
      transition-all duration-200

      file:mr-4
      file:cursor-pointer
      file:rounded-lg
      file:border-0
      file:bg-gray-900
      file:px-4
      file:py-2
      file:text-sm
      file:font-medium
      file:text-white
      file:transition-colors

      hover:border-gray-400
      hover:bg-gray-100

      focus:outline-none
      focus:ring-2
      focus:ring-gray-900/20
      focus:ring-offset-2

      dark:border-gray-700
      dark:bg-gray-900
      dark:text-gray-300

      dark:file:bg-white
      dark:file:text-gray-900

      dark:hover:border-gray-600
      dark:hover:bg-gray-800

      disabled:cursor-not-allowed
      disabled:opacity-50
    `,

    default: `
      w-full
      rounded-xl
      border border-gray-200
      bg-white
      px-4 py-3
      text-sm text-gray-900
      shadow-sm

      placeholder:text-gray-400

      transition-all duration-200 ease-in-out

      hover:border-gray-300
      hover:shadow

      focus:border-gray-900
      focus:outline-none
      focus:ring-4
      focus:ring-gray-900/10
      focus:shadow-md

      disabled:cursor-not-allowed
      disabled:bg-gray-100
      disabled:text-gray-400
      disabled:opacity-75

      dark:border-gray-700
      dark:bg-gray-950
      dark:text-gray-100
      dark:placeholder:text-gray-600

      dark:hover:border-gray-600

      dark:focus:border-gray-400
      dark:focus:ring-white/10
      dark:focus:shadow-lg

      dark:disabled:bg-gray-900
    `,
  };

  const inputStyle = styles[type as keyof typeof styles] ?? styles.default;

  return <input ref={ref} type={type} {...props} className={`${inputStyle} ${className}`.replace(/\s+/g, " ").trim()} />;
});

export default Input;
