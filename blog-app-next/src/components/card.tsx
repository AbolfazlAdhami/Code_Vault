import type { ReactNode } from "react";

export default function Card({ children, className }: { children: ReactNode; className: string }) {
  return <div className={`border rounded-md border-gray-600 p-4 ${className}`}>{children}</div>;
}
