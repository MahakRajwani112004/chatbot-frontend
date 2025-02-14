import { Textarea } from "@heroui/react";

interface ICustomTextAreaProps {
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  placeholder?: string;
  name?: string;
}

const CustomTextArea = (props: ICustomTextAreaProps) => {
  const { onKeyDown, onChange, className, value, placeholder, name } = props;
  return (
    <Textarea
      name={name}
      onKeyDown={onKeyDown}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      value={value}
    />
  );
};
export default CustomTextArea;
