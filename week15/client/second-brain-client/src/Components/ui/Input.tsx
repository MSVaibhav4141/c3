import React, { Dispatch, ReactElement, useRef } from "react";
import { CloseIcon } from "./Icons";

interface InputProp {
  placeholder: string;
  startIcon?: ReactElement<{ className: string }>;
  endIcon?: ReactElement;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  onChange?: () => void;
  input: string;
  setInput: Dispatch<React.SetStateAction<string>>;
  className?: string;
}

const defaultStyle = {
  style: `focus:outline-none border-1 trasition caret-inherit duration-150 focus:border-purple-200 border-purple-100 text-extralight`,
};

const inputVariant: Record<string, string> = {
  xs: "p-1 rounded-sm",
  sm: "p-2 rounded-md",
  md: "p-3 rounded-md",
  lg: "p-4 rounded-lg",
  xl: "p-5 rounded-lg",
};

export const Input = (props: InputProp) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="text-grey-200 relative">
      <input
        ref={inputRef}
        placeholder={props.placeholder}
        className={`${inputVariant[props.size]} ${defaultStyle.style} ${
          props.className
        }`}
        type="text"
        value={props.input}
        onChange={(e) => props.setInput(e.target.value)}
      />
      <div
        className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-600`}
      >
        {props.input.length > 0 ? (
          <span onClick={() => props.setInput("")}>
            <CloseIcon stroke={1} />
          </span>
        ) : (
          props.startIcon
        )}
      </div>
    </div>
  );
};
