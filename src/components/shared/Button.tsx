"use client";

import { PropsWithChildren, useMemo } from "react";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: "primary" | "secondary" | "box" | "rounded" | "rounded-dark";
  className: string;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  type,
  children,
  className,
}) => {
  const typeClassName = useMemo(() => {
    switch (type) {
      case "primary":
        return "text-purple-600 rounded-md hover:bg-purple-400 transtion hover:text-white";
      case "secondary":
        return "text-purple-600 rounded-md hover:bg-purple-700 transtion hover:text-white";
      case "box":
        return "text-black dark:text-white";
      case "rounded":
        return "";
      case "rounded-dark":
        return "";
      default:
        return "";
    }
  }, [type]);

  return (
    <button onClick={onClick} className={`${typeClassName} ${className}`}>
      {children}
    </button>
  );
};
export default Button;
