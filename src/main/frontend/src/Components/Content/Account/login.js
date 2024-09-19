import React from "react";
import "../../../style/account.css";
import {Link} from "react-router-dom";

const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
const K_REDIRECT_URI = 'http://localhost:3000/oatuh';
const kakaoURL = 'https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code';

const Login = () => {
    const handlekakaLogin = () => {
        window.location.href = kakaoURL;
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
                        <form className="form-content">
                            <div className="idInput">
                                <input type="text" placeholder="아이디" size={20} />
                            </div>
                            <div className="pwInput">
                                <input type="password" placeholder="비밀번호" size={20} />
                            </div>
                            <div className="pwFind">
                                <Link to="/login">비밀번호 찾기</Link>
                            </div>
                            <button type="submit" className="loginbtn">로그인</button>
                        </form>
                    </div>
                    <div className="loginImg">
                        <img src="/img/snlogo.png" alt="snlogo" className="logo" />
                    </div>
                </div>
            </section>
        </>
    )
    
}

export default Login;