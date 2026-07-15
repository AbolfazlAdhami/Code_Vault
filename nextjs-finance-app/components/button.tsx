import { sizes, variants } from "@/libs/variants";

interface ButtonPropsType {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}

export const Button = (props: ButtonPropsType) => {
  return <button {...props} className={`${props.variant ? variants[props.variant] : variants["default"]} ${props.size ? sizes[props.size] : sizes["base"]} ${props.className}`}></button>;
};
