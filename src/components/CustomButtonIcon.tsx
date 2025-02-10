import { Button, cn } from "@heroui/react";

interface ICustomButtonIconProps {
  children: React.ReactNode;
  onPress: () => void;
  btnColor?: "primary" | "secondary" | "success" | "warning";
  buttonRadius?: "none" | "sm" | "md" | "lg" | "full";
  variant?:
    | "shadow"
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "ghost";
  className?: string;
  disableRipple?: boolean;
}

const CustomButtonIcon = (props: ICustomButtonIconProps) => {
  const {
    children,
    onPress,
    btnColor = "secondary",
    buttonRadius = "full",
    variant = "flat",
    className,
    disableRipple = false,
  } = props;

  return (
    <Button
      variant={variant}
      color={btnColor}
      className={cn(className)}
      radius={buttonRadius}
      onPress={onPress}
      isIconOnly={true}
      disableRipple={disableRipple}
    >
      {children}
    </Button>
  );
};

export default CustomButtonIcon;
