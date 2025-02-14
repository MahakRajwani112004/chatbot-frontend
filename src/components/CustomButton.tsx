import { Button } from "@heroui/react";
import React from "react";

interface ICustomButtonProps {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  onPress?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const CustomButton = (props: ICustomButtonProps) => {
  const { children, className, isDisabled, onPress , type } = props;
  return (
    <Button className={className} disabled={isDisabled} onPress={onPress} type={type}>
      {children}
    </Button>
  );
};
export default CustomButton;
