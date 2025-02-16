import { useState } from "react"

export const useCounter  = () => {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(e => e + 1);
    }

    return{
        count,
        increaseCount
    }
}
