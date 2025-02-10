import { Textarea } from "@heroui/react";

interface ICustomInputProps {
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  placeholder?: string;
}

const CustomInput = (props: ICustomInputProps) => {
  const { onKeyDown, onChange, className, value, placeholder } = props;
  return (
    <Textarea
      onKeyDown={onKeyDown}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      value={value}
    />
  );
};
export default CustomInput;
