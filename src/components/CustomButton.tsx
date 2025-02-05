import { Button } from "@heroui/react";
import React from "react";

interface ICustomButtonProps {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  onPress?: () => void;
}

const CustomButton = (props: ICustomButtonProps) => {
  const { children, className, isDisabled, onPress } = props;
  return (
    <Button className={className} disabled={isDisabled} onPress={onPress}>
      {children}
    </Button>
  );
};
export default CustomButton;
