import {useEffect, useRef, useState } from "react"

// export const useDebounce = (fn) => {
//     const currentClock = useRef();
    
//     const doDebounce = () => {
//         clearTimeout(currentClock.current);
//     console.log('debounced')
//     currentClock.current = setTimeout(() => {
//         fn();
//     }, 1000);
//     }

//     return doDebounce;

// }

// or

export const useDebounce = (value, delay) => {
    const [changedValue,setValue] = useState(value);

    useEffect(() => {
        const debounceTime = setTimeout(() => {
            setValue(value);
        }, delay);
        
        return () => clearTimeout(debounceTime);
    }, [value, delay])

    return changedValue;
}