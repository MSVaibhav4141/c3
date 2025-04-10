import React, { cloneElement, Dispatch, ReactElement, SetStateAction } from "react";

type BadgeProps = {
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    items:ReactElement<{className:string}>[],
    reference?:React.Ref<HTMLDivElement> | undefined;
}

const actionState:Record<string, string> = {
    'true':`scale-[1] opacity-100 `,
    'false':`scale-0 opacity-0`
}

const defaultStyle = {
    style:'whitespace-nowrap -right-3 z-[110] rounded-md bg-modal shadow-md text-sm p-2 font-semibold absolute top-12 border-1 border-gray-200 transition duration-150 origin-top'
}

export const BadgeModal = (props:BadgeProps) => {
    
    
 
   
  return (
    <>
      <div ref={props.reference} className="relative pointer-events-auto">
        <img
            onClick={() => props.setOpen(prev => !prev)}
          src="/assets/brain.png"
          alt=""
          className="rounded-[50%] w-10 h-10  hover:scale-[1.1] transition duration:150 pointer-events-auto"
        />
        <div className={`${defaultStyle.style} ${actionState[props.open.toString()]}`}>
            
          {props.items.map((i,index) => cloneElement(i,{
            className:`${index === 0 ? 'flex items-end' : ''} mt-2 hover:bg-purple-200 p-2 rounded-md cursor-pointer transition duration-250 block pointer-events-auto w-full`,
          }))}
        </div>
      </div>
    </>
  );
};
