import React, { Dispatch, ReactElement, useRef } from "react";
import { CloseIcon } from "./Icons";
import { Link } from "react-router-dom";

interface InputProp {
  placeholder: string;
  startIcon?: ReactElement<{ className: string }>;
  endIcon?: ReactElement;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  onChange?: () => void;
  input: string;
  setInput: Dispatch<React.SetStateAction<string>>;
  className?: string;
  isResultLoad?:boolean,
  finalResult?:{id:string, content:string}[]
  isSuccess?:boolean
}

const defaultStyle = {
  style: `focus:outline-none border-1 text-grey-400 dark:border-border-color trasition caret-inherit duration-150 focus:border-purple-200 border-purple-100 text-extralight !w-[350px]`,
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
        } w-full`}
        type="text"
        value={props.input}
        onChange={(e) => props.setInput(e.target.value)}
      />
      {props.isResultLoad &&  <span className="absolute right-[40px] top-1/2 -translate-y-1/2 flex size-3">
           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-75"></span>
           <span className="relative inline-flex size-3 rounded-full bg-purple-500"></span></span>}
     
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
      {(inputRef.current?.value.length ?? 0) > 0 && 
      <div className="absolute -bottom-[0] rounded-sm w-[97%] left-1/2 -translate-x-1/2  bg-white shadow-lg hidden sm:block ">
      {props.finalResult && props.finalResult.length === 0 ? props.isSuccess &&  <div className="w-full shadow-md bg-gray-200 px-2 m-2 mt-2 rounded-md text-center py-3 mx-auto">No result found</div> : 
       !props.isResultLoad && props.finalResult?.map((i, index) => (
        <Link className="flex justify-center" to={`/search/${i.id}`}><div className="w-full shadow-md bg-gray-200 hover:bg-purple-200 px-2 m-2 mt-2 rounded-md text-center py-3" key={index}>{i.content}</div></Link>
      ))
      }
    </div>
      }
    </div>
  );
};
