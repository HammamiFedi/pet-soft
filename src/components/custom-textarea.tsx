import { HTMLProps, forwardRef } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import InputError from "./input-error";

type CustomTextareaProps = HTMLProps<HTMLTextAreaElement> & {
  error?: string;
};

const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  function CustomTextarea(props, ref) {
    const { id, name, label, placeholder, error, onChange, onBlur } = props;

    return (
      <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>
        <Textarea
          className={`${error && "ring-[1px] ring-red-500 focus-visible:ring-red-500"}`}
          ref={ref}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        <InputError>{error}</InputError>
      </div>
    );
  },
);

CustomTextarea.displayName = "CustomTextarea";

export default CustomTextarea;
