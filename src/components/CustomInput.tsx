import { cn, Input } from "@heroui/react";

interface ICustomInputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  type?:
    | "text"
    | "search"
    | "url"
    | "tel"
    | "email"
    | "password"
    | "file"
    | "date"
    | "time"
    | "week";
  errorMessage?: string;
  isInvalid?: boolean;
}

const CustomInput = (props: ICustomInputProps) => {
  const {
    onChange,
    className,
    value,
    placeholder,
    type,
    label,
    name,
    errorMessage,
    isInvalid,
    onBlur,
  } = props;
  return (
    <Input
      classNames={{
        base: cn(className),
        label: cn(isInvalid && "text-red"),
        errorMessage: "text-red font-medium text-start",
        input: cn({ "text-red": isInvalid }),
      }}
      label={label}
      name={name}
      type={type}
      onBlur={onBlur}
      errorMessage={errorMessage}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      value={value}
    />
  );
};
export default CustomInput;
