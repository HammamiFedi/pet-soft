import { HTMLProps, forwardRef } from "react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import InputError from "./input-error";

type CustomInputProps = HTMLProps<HTMLInputElement> & {
  error?: string;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  function customInput(props, ref) {
    const { id, name, type, label, placeholder, error, onChange, onBlur } =
      props;

    return (
      <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>
        <Input
          className={`${error && "ring-[1px] ring-red-500 focus-visible:ring-red-500"}`}
          ref={ref}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        <InputError>{error}</InputError>
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
