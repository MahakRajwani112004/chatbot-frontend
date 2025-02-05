import { Input } from "@heroui/react";

interface ICustomInputProps {
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  placeholder?: string;
  type?:
    | "text"
    | "search"
    | "url"
    | "tel"
    | "email"
    | "password"
    | "file"
    | "date"
    | "time";
}

const CustomInput = (props: ICustomInputProps) => {
  const { type, onKeyDown, onChange, className, value, placeholder } = props;
  return (
    <Input
      type={type}
      onKeyDown={onKeyDown}
      onChange={onChange}
      className={className}
      value={value}
      placeholder={placeholder}
    />
  );
};
export default CustomInput;
