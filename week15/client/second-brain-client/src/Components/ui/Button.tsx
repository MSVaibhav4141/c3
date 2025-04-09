import { ReactElement } from "react";
import { Loader } from "./Icons";

interface buttonProps {
  variant: "primary" | "secondary" | "alert";
  size: "sm" | "md" | "lg";
  title: string;
  color?: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  className?: string;
  onClick?: (e: any) => void;
  type?: "submit";
  disabled?: boolean;
  loading?: boolean;
}

const ButtonVariant: Record<string, string> = {
  primary: "bg-purple-300 text-white hover:bg-purple-500 rounded-md",
  secondary:
    "bg-transparent border border-purple-300 text-purple-300 hover:bg-purple-50 rounded-md",
  sm: "w-25 h-10 rounded-md",
};

const defaultStyling = {
  style:
    "transition ease-in-out duration:150 cursor-pointer flex items-center justify-center disabled:bg-purple-200 disabled:bg disabled:cursor-default",
};
export const Button = (props: buttonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`${props.color} ${defaultStyling.style} ${
          ButtonVariant[props.variant]
        } ${ButtonVariant[props.size]}}
        ${props.className}`}
        type={props.type || "button"}
        disabled={props.disabled || props.loading}
      >
        {props.loading ? (
          <Loader stroke={2} />
        ) : (
          <span className="flex items-center">
            {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
            {props.title}
            {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
          </span>
        )}
      </button>
    </>
  );
};
