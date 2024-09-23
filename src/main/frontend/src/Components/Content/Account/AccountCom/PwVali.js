import React, {useState} from "react";

const PwVali = (props) => {
    const [value, setValue] = useState(props.value ?? '');
    const [error, setError] = useState(null);
    const onChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        
        let hasError = false;
        props.validators.forEach((rule) => {
            if (!hasError) {
                if (!rule.fn(newValue)) {
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
        } else {
            console.log("실패" + newValue);
        }

        // id 체크 여부 기능 넣어야함
    }

    return (
        <>
            <input
                type="password"
                name="pw"
                value={value}
                onChange={onChange}
                placeholder="비밀번호"
            />
            <span style={{color: 'red', fontSize: '12px', display: 'block'}}>{error}</span>
        </>
    )
}

export default PwVali;