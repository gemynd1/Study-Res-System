import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";


const Oauth = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleToken = (token) => {
        try {
            if(!token || typeof token !== "string") {
                return
            } else {
                // 토큰 디코딩
                const decoded = jwtDecode(token);
                console.log("Decoded Token:", decoded);

                // 필요한 정보 추출
                const userInfo = {
                    MemberId: decoded.MemberId, // 토큰에 저장된 subject
                    MemberName: decoded.MemberName, // 토큰에 저장된 사용자 정보 (예시)
                };

                console.log("User Info from Token:", userInfo);

                // 상태 관리 또는 로컬 스토리지에 저장
                setUser(userInfo); // 예: Recoil이나 Context API 사용
            }
        } catch (error) {
            console.error("Failed to decode token:", error);
        }
    };

    useEffect(() => {
        // 인가코드를 추출할 변수 생성 현재 url 가지고있음
        // const url = new URL(window.location.href);
        // 위에서 만든 url 에서 code=라고 써진 키값인데 우리는 response_type으로 설정하여 변경
        // const code = url.searchParams.get('code');
        // 얻은 인가코드를 백엔드의 카카오 로그인 주소로 보냄
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code"); // Authorization Code 추출
        // console.log(code);

        // if (code) {
        //     // Authorization Code를 백엔드로 전달
        //     fetch(`http://localhost:8099/api/kakao?${code}`, {
        //         method: "GET",
        //         headers: { "Content-Type": "application/json" },
        //         // body: JSON.stringify({ code }), // code 전달
        //     })
        //         .then((res) => {
        //             console.log(res.data)
        //         })
        //         .catch((error) => console.error("Error:", error));
        // } else {
        //     console.error("Authorization Code is missing");
        // }
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/kakao`,
            {code: code},
            {   
                headers: {
                    "Content-Type": "application/json",
                },
                // headers: {
                //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;application/json",
                // },
                withCredentials: true,
            }
        )
        .then((res) => {
            //5. ok respone 확인하고, 이후 작업 해야함(유저로그인시키기, 토큰 브라우저에 저장)
            const token = res.data;
            console.log("Token:", res.data);  
            // 로컬 스토리지에 저장
            localStorage.setItem("token", token);
            // 토큰 디코딩
            const decoded = jwtDecode(token);
            console.log("Decoded Token:", decoded);

            // 필요한 정보 추출
            const userInfo = {
                MemberId: decoded.MemberId, // 토큰에 저장된 subject
                MemberName: decoded.MemberName, // 토큰에 저장된 사용자 정보 (예시)
                MemberPw : decoded.MemberPw, // claim pw null체크하기 위함
                MemberPhone : decoded.MemberPhone, // claim null 체크하기 위함
            };

            if(!userInfo.MemberPw || !userInfo.MemberPhone) {
                alert("환영합니다. 통합 회원 로그인 후 이용 가능합니다")
                navigate("/join?memberId=" + userInfo.MemberId + "&memberName=" + userInfo.MemberName + "&logintype=kakao");
            } else {
                sessionStorage.setItem("id", userInfo.MemberId);
                sessionStorage.setItem("name", userInfo.MemberName);
                alert(userInfo.MemberName + "님, 환영합니다.");
                navigate("/");
            }
            
            
            // axios.get(`${process.env.REACT_APP_SERVER_URL}/api/userinfo`, {
            //     headers: {
            //     //헤더에 token을 담아서 전달 
            //         Authorization: token,
            //         "Content-Type": "application/json",
            //     },
            // })
            //     //서버에서 유휴성 검사 - > 확인되면 유저 데이터 전달해주고 프론트에서는
            //     // const setUser = useSetRecoilState(userState);
            //     // recoilstate로 유저 데이터 저장
            //     // 하고 dashboard로 이동 시키기  로그인끝!
            // .then((response) => {
            //     console.log(response.data);
            //     setUser(response.data);
            //     navigate("/");
            // });
        })
        .catch((error) => {
            console.log(error);
        });
    }, [user]);

    return (
        <div style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            width: '100%', margin: 'auto', paddingTop: '300px', paddingBottom: '300px'
        }}>
            <img src='/img/icon/spinner.gif' alt='loading' />
            <p>로그인 진행 중입니다. 잠시만 기다려 주세요...</p>
        </div>
    );
};

export default Oauth;