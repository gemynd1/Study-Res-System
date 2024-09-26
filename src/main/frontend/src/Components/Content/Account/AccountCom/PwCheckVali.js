import React, {useState, useEffect} from "react";

const PwCheckVali = (props) => {
    const [value, setValue] = useState(props.value ?? '');
    const [error, setError] = useState(null);

    useEffect(() => {
        setValue(props.value ?? '');
    }, [props.value]);

    const onChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        
        let hasError = false;
        const validators = props.validators();
        validators.forEach((rule) => {
            if (!hasError) {
                if (!rule.fn(newValue)) {
                    // console.log(rule.fn)
                    setError(rule.message);
                    hasError = true;
                }
            }
        });

        if(!hasError) {
            setError(null);
            // props.onInput(newValue)
            props.onInput?.(newValue);
            console.log("성공" + newValue);
            // console.log(value);
        } else {
            // console.log(value);
            console.log("실패" + newValue);
            
        }
    }

    return (
        <>
            <input
                type="password"
                name="pwcheck"
                value={value}
                onChange={onChange}
                placeholder="비밀번호 확인"
            />
            <span style={{color: 'red', fontSize: '12px', display: 'block'}}>{error}</span>
        </>
    )
}

export default PwCheckVali;