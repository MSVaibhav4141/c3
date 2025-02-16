import { useEffect, useRef, useState } from "react"

// export const usePrev = (value) => {
//     const ref = useRef();
//     // const [ref ,setRef] = useState()
//     // Update the ref with the current value after each render
//     useEffect(() => {
//         ref.current = value
//     }, [value]);
    
//     // Return the previous value (current value of ref before it is updated)
//     return ref.current;
//   };

export function usePrev(value, initial) {
    const ref = useRef({ target: value, previous: initial });
    if (ref.current.target !== value) {
      ref.current.previous = ref.current.target;
      ref.current.target = value;
    }
    return ref.current.previous;
  }