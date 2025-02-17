import { Textarea } from "@heroui/react";

interface ICustomTextAreaProps {
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  errorMessage?: string;
  isInvalid?: boolean;
}

const CustomTextArea = (props: ICustomTextAreaProps) => {
  const {
    onKeyDown,
    onChange,
    className,
    value,
    placeholder,
    name,
    errorMessage,
    isInvalid,
  } = props;
  return (
    <Textarea
      name={name}
      onKeyDown={onKeyDown}
      onChange={onChange}
      className={className}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      placeholder={placeholder}
      value={value}
    />
  );
};
export default CustomTextArea;
