import React, { useState } from "react";
import "../../../style/account.css";
import {Link, useActionData, useNavigate} from "react-router-dom";
import axios from "axios";
import { Paragliding } from "@mui/icons-material";

const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
const K_REDIRECT_URI = 'http://localhost:3000/oatuh';
const kakaoURL = 'https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code';

const Login = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const navigate = useNavigate();

    const handlekakaLogin = () => {
        window.location.href = kakaoURL;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        axios.get("http://localhost:8099/api/login", 
            {
                params: { id, pw },
                headers : { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            alert(response.data + "님 환영합니다.");
            navigate("/");
            console.log(response.data); // 응답 출력
        })
        .catch(error => {
            console.log(error); // 응답 출력
        })
    }

    return (
        <>
            <section className="loginSec">
                <div className="loginMain">
                    <div className="login-tit">
                        <span>회원 로그인</span>
                    </div>
                    <div className="loginContent">
                        <button onClick={handlekakaLogin} className="kakaoButton">
                            <img src="/img/kakao_login_btn.png" />
                        </button>
                        <div className="hrline">
                            <hr className="line1" />
                            <div className="linecenter">   
                                <h2>또는</h2>
                            </div>
                            <hr className="line2" />    
                        </div>
                        <form className="form-content" onSubmit={onSubmit}>
                            <div className="idInput">
                                <input 
                                    type="text" 
                                    name="id"
                                    placeholder="아이디" 
                                    value={id} 
                                    size={20} 
                                    onChange={(e) => setId(e.target.value)} />
                            </div>
                            <div className="pwInput">
                                <input 
                                type="password"
                                name="pw"
                                placeholder="비밀번호" 
                                value={pw} 
                                size={20} 
                                onChange={(e) => setPw(e.target.value)} />
                            </div>
                            <div className="pwFind">
                                <Link to="/join">회원가입</Link>
                                <Link to="/login">비밀번호 찾기</Link>
                            </div>
                            <button type="submit" className="loginbtn">로그인</button>
                        </form>
                    </div>
                    <div className="loginImg">
                        <Link to="/">
                            <img src="/img/snlogo.png" alt="snlogo" className="logo" />                        
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
    
}

export default Login;