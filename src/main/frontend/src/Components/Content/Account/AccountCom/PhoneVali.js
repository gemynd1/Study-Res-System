import React, {useEffect, useState} from "react";

const PhoneVali = (props) => {
    const [value, setValue] = useState(props.value ?? '');
    const [error, setError] = useState(null);

    const onChange = (e) => {
        const newValue = e.target.value.replace(/\D+/g, "");
        const numberLength = 11;
        const numberLength2 = 10;
        let result = '';
        console.log(newValue);
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
        console.log(result);
        
        let hasError = false;
        props.validators.forEach((rule) => {
            if(!hasError) {
                if(!rule.fn(result)) {
                    setError(rule.message);
                    hasError = true;
                }
            }
        });

        // if(newValue.length === 13) {
        //     newValue.replace(/-/g, '');
        //     setValue(newValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))   
        // } else if(newValue.length === 10) {
        //     setValue(newValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'))   
        // }

        if(!hasError) {
            setError(null);

            props.onInput?.(result);
            console.log("성공" + result);
        } else {
            console.log("실패" + result);
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
            />
            <span style={{color: 'red', fontSize: '12px', display: 'block'}}>{error}</span>
        </>
    )
}

export default PhoneVali;