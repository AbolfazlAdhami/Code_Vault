import { ReactNode } from "react";

interface AlertPropsType {
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Alert = ({ title, children, icon }: AlertPropsType) => {
  return (
    <div>
      <div>{icon}</div>
      <div>
        <h4>{title}</h4>
      </div>
    </div>
  );
};
