import { Button, ButtonPropsType } from "./Button";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";

export const SubmitButton = (props: ButtonPropsType) => {
  const { pending } = useFormStatus();
  return (
    <Button {...props} className={`${props.className} flex items-center justify-center space-x-1`} disabled={pending}>
      {pending && <Loader className="animate-spin w-4 h-4" />}
      <span>{props.children}</span>
    </Button>
  );
};
