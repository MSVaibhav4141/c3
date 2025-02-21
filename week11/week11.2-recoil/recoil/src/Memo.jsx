import { memo } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { atomSelector } from "./store/selector/selector";
import { counter } from "./store/atoms/counter";


const Value = memo(({value}) => {
    return<>
    <div>{value}</div>
    </>
    
})

const Greeting = memo(function Greeting() {
    const value = useRecoilValue(atomSelector)
    return <h1>Hello, {value ? "Even" : "Odd"} </h1>;
  });
  

const DecreaseButton = memo(() => {
    const setCount = useSetRecoilState(counter)
    return <>
    <button onClick={() => setCount(e => e + 1)}>Click Me To Add</button>
    </>
})
const IncreaseButton = memo(() => {
    const setCount = useSetRecoilState(counter)
    return <>
    <button onClick={() => setCount(e => e - 2)}>Click Me To Sub - 2</button>
    </>
})

export const Memo = () => {
    const value = useRecoilValue(counter);

    // useEffect(() => {
    //     setInterval(() => {
    //         setState(e => e + 1)
    //     }, 2000);
    // },[])

    return<div>
    <Value value={value}/>
    <Greeting />
    <DecreaseButton/>
    <IncreaseButton/>
    </div>
}

//component having setcount or calling setcount doesnt re-render but the component using the state value or having the whole state re redners