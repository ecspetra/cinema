import React, { FC } from "react";
import classNames from "classnames";

type PropsType = {
  onClick?: React.MouseEventHandler;
  children?: string | JSX.Element | JSX.Element[];
  context?: "filled" | "empty" | "icon-text" | "icon" | "text";
  className?: string;
  type?: 'submit' | 'reset' | 'button';
};

const Button: FC<PropsType> = ({
  onClick,
  children,
  context = "filled",
  className,
  type = "button"
}) => {
  const filledButtonClassNames =
    "w-72 bg-red-600 rounded-md hover:bg-orange-500 font-semibold p-3 flex justify-center items-center";
  const emptyButtonClassNames =
    "w-72 border-2 border-red-600 text-red-600 rounded-md hover:border-transparent hover:w-full hover:text-white font-semibold p-3 flex justify-center items-center";
  const textButtonClassNames =
    "rounded-md inline-flex w-auto p-0 bg-transparent text-violet-500 underline hover:text-violet-400 hover:no-underline";
  const iconTextButtonClassNames = "w-full bg-violet-700 rounded-md";
  const iconButtonClassNames = "w-full bg-violet-700 rounded-md";

  const getButtonClassNames = () => {
    switch (context) {
      case "filled":
        return filledButtonClassNames;
      case "empty":
        return emptyButtonClassNames;
      case "text":
        return textButtonClassNames;
      case "icon-text":
        return iconTextButtonClassNames;
      case "icon":
        return iconButtonClassNames;
    }
  };

  return (
    <button
      type={type}
      className={classNames("duration-300", className, getButtonClassNames())}
      onClick={(event) => {
        onClick && onClick(event);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
