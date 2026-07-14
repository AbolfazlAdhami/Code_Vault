import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label {...props} className={`block text-gray-700 dark:text-gray-300 ${className}`}>
      {children}
    </label>
  );
};
