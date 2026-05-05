import type { ComponentProps } from "react";

export default function H1(props: ComponentProps<"h1">) {
  return <h1 className="mb-8 text-2xl not-prose" {...props} />;
}
