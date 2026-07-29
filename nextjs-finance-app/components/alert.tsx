import { ReactNode } from "react";

interface AlertPropsType {
  title?: string | ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Alert = ({ title, children, icon }: AlertPropsType) => {
  return (
    <div className="p-2 rounded-md border border-gray-200 dark:border-gray-800 flex space-x-2">
      <div className="shrink-0 ">{icon}</div>
      <div className="space-y-1">
        <h4>{title}</h4>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};
