import React, {useState} from "react";

const PhoneVali = (props) => {
    const [value, setValue] = useState(props.value ?? '');

    const [error, setError] = useState();

    const onChange = (e) => {
        setValue(e.target.value);

        let hasError = false;
        props.validators.forEach((rule) => {
            if(!hasError) {
                if(!rule.fn(e.target.value)) {
                    setError(rule.message);
                    hasError = true;
                }
            }
        });

        if(!hasError) {
            setError('');
            props.onInput(e.target.value);
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