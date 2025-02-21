import { useEffect, useRef, useState } from "react";

export const OtpInput = ({ numbers }) => {
    const otpBoxes = useRef([]);
    const [otpNumber, setOtpValue] = useState(Array(numbers).fill(""));
    
    useEffect(()=> {
        otpBoxes.current[0].focus()
    },[])
    const handleChange = (e, index) => {
        const value = e.target.value;
        if(isNaN(value) || value==='') return; // imp bit 
        // console.log(isNaN(value),index,'chang3')
        const arr = [...otpNumber]
        arr[index] = value.substring(value.length - 1); // Imp bit
        setOtpValue(arr)


        // console.log(arr.join(''));

        if(otpBoxes.current[index + 1] && index < numbers){
            otpBoxes.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e,index) => {
        if(e.key === 'Backspace' ){
            const arr = [...otpNumber]
        arr[index] = ''; // Imp bit
        setOtpValue(arr)
            index > 0 && otpBoxes.current[index - 1].focus();
        }
    }

    const handleClick = (e) => {
        e.target.setSelectionRange(1,1) //imp bit
    }
    return (
        <div>
            {Array(numbers).fill(0).map((item, index) => (
                <SubOtpBox 
                value={otpNumber[index]}
                key={index} 
                onChange={(e) => handleChange(e,index)}
                onClick={(e) => handleClick(e)}
                onKeyDown= {(e) => handleKeyDown(e,index)}
                reference={el => otpBoxes.current[index] = el
                }/>
            ))}
        </div>
    );
};

const SubOtpBox = ({ reference, onChange, onKeyDown, onClick, value }) => {
    return (
    <input type="text" value={value} ref={reference} onChange={onChange} onKeyDown={onKeyDown} onClick={onClick} className="bg-blue-400 mx-1 w-5 p-1 text-center rounded mt-3 text-white"/>
    );
};
