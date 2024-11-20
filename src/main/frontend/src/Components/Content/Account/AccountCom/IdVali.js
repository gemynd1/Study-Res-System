import axios from "axios";
import React, {useEffect, useState} from "react";

const IdVali = (props) => {
    const [value, setValue] = useState(props.value ?? '');
    const [error, setError] = useState(null);
    const baseUrl = "http://localhost:8099";

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
            axios.get(baseUrl + '/api/idcheck', 
            {
                params: { newValue },
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => {
                console.log(response.data); // 응답 출력
                if(response.data === false) {
                    setError("사용 가능한 아이디입니다.");

                    props.onInput?.(newValue);
                    console.log("성공" + newValue);

                    props.setCheck(true)
                    props.setId({
                        ...props.id,
                        id:newValue
                    })
                }
                else if (response.data === true) {
                    setError("중복된 아이디입니다.");
                    return false;
                }
            })
            .catch(error => {
                console.log(error); // 응답 출력
                return false;
            })
        } else {
            console.log("실패" + newValue);
            return false;
        }

        // id 체크 여부 기능 넣어야함
    }

    return (
        <>
            <input
                type="text"
                name="id"
                value={value}
                onChange={onChange}
                placeholder="아이디"
            />
            <span style={{color: 'red', fontSize: '12px', display: 'block'}}>{error}</span>
        </>
    )
}

export default IdVali;