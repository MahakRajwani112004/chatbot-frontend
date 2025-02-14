import { Card, CardBody, cn } from "@heroui/react";
import { CSSProperties, ReactNode } from "react";

interface ICustomCardProp {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onPress?: () => void;
  shadow?: "none" | "sm" | "md" | "lg";
  isPressable?: boolean;
}

const CustomCard = (props: ICustomCardProp) => {
  const {
    children,
    className,
    shadow = "none",
    onPress,
    isPressable = false,
    style,
  } = props;

  return (
    <Card
      className={cn("bg-secondary", className)}
      shadow={shadow}
      onPress={onPress}
      isPressable={isPressable}
      style={style}
    >
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default CustomCard;
