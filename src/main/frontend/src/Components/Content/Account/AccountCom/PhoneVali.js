import React, {useEffect, useState} from "react";

const PhoneVali = (props) => {
    const [value, setValue] = useState(props.value ?? '');
    const [error, setError] = useState(null);

    const onChange = (e) => {
        const newValue = e.target.value.replace(/\D+/g, "");
        const numberLength = 11;
        const numberLength2 = 10;
        let result = '';
        // console.log(newValue);
        if(newValue.length <= numberLength2) {
            for (let i = 0; i < newValue.length && i < numberLength2; i++) {
                if (i === 3 || i === 6) {
                    result += "-";
                }
                result += newValue[i];
            }
            
        }
        else if(newValue.length <= numberLength) {
            for (let i = 0; i < newValue.length && i < numberLength; i++) {
                if (i === 3 || i === 7) {
                    result += "-";
                }
                result += newValue[i];
            }
        } 
        else {
            return false;
        }
        
        setValue(result);
        // console.log(result);
        
        let hasError = false;
        props.validators.forEach((rule) => {
            if(!hasError) {
                if(!rule.fn(result)) {
                    setError(rule.message);
                    hasError = true;
                }
            }
        });

        if(!hasError) {
            setError(null);
            props.onInput?.(result);
            // console.log("성공" + result);
            return true;
        } else {
            // console.log("실패" + result);
            return false;
        }
    }
    return (
        <>
            <input
                type="text"
                name="phonenumber"
                value={value}
                onChange={onChange}
                placeholder="전화번호"
                required
            />
            <span style={{color: 'red', fontSize: '12px', display: 'block'}}>{error}</span>
        </>
    )
}

export default PhoneVali;