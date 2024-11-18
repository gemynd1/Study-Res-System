import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Oauth = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 인가코드를 추출할 변수 생성 현재 url 가지고있음
        // const url = new URL(window.location.href);
        // 위에서 만든 url 에서 code=라고 써진 키값인데 우리는 response_type으로 설정하여 변경
        // const code = url.searchParams.get('code');
        // 얻은 인가코드를 백엔드의 카카오 로그인 주소로 보냄
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code"); // Authorization Code 추출
        // console.log(code);

        if (code) {
            // Authorization Code를 백엔드로 전달
            fetch("http://localhost:8099/api/kakao", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }), // code 전달
            })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((error) => console.error("Error:", error));
        } else {
            console.error("Authorization Code is missing");
        }
        // axios.get(`${process.env.REACT_APP_SERVER_URL}/api/kakao?code=${encodeURIComponent(JSON.stringify(code))}`, {
        //     headers : "Content-Type: application/x-www-form-urlencoded;charset=utf-8"
        // })
        // .then((res) => {
        //     //5. ok respone 확인하고, 이후 작업 해야함(유저로그인시키기, 토큰 브라우저에 저장)
        //     console.log(res.data);
        //     // localStorage.setItem("token", res.data.token);
        //     // axios //서버에서 유저정보 요청하는 url 
        //     // .get(`${process.env.REACT_APP_SERVER_URL}/userinfo`, {
        //     //     headers: {
        //     //     //헤더에 token을 담아서 전달 
        //     //     Authorization: "Bearer " + res.data.token,
        //     //     },
        //     // })
        //     //     //서버에서 유휴성 검사 - > 확인되면 유저 데이터 전달해주고 프론트에서는
        //     //     // const setUser = useSetRecoilState(userState);
        //     //     // recoilstate로 유저 데이터 저장
        //     //     // 하고 dashboard로 이동 시키기  로그인끝!
        //     // .then((response) => {
        //     //     setUser(response.data);
        //     //     navigate("/");
        //     // });
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }, []);

    return (
        <div>
            <h1>로그인</h1>
        </div>
    );
};

export default Oauth;