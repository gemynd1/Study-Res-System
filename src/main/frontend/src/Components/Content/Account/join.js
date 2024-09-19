import React, {useState, useRef} from "react";
import Modal from 'react-modal';
import {Link } from "react-router-dom";

const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
const K_REDIRECT_URI = 'http://localhost:3000/oatuh';
const kakaoURL = 'https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code';

const Join = () => {
    const handlekakaLogin = () => {
        window.location.href = kakaoURL;
    }
    return (
        <>
            <section className="joinSec">
<<<<<<< HEAD
                
=======
                <div className="joinMain">
                    <div className="join-tit">
                        <span>회원가입</span>
                    </div>
                    <div className="joinContent">
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
                            <div className="nickInput">
                                <input type="text" name="nickname" placeholder="닉네임" size={10} />
                            </div>
                            <div class="postInput">
                                <input type="text" name="postcode" placeholder="우편번호" readOnly />
                                <button type="button" className="postBtn">우편번호 찾기</button>
                            </div>
                            <div class="addInput">
                                <input type="text" name="address" id="address" placeholder="도로명 주소" readOnly />
                            </div>
                            <div class="detailAddInput">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="detailAddress"
                                    placeholder="상세 주소"
                                    required
                                />
                            </div>
                            <div className="idInput">
                                <input type="text" placeholder="아이디" size={30} />
                            </div>
                            <div className="pwInput">
                                <input type="password" placeholder="비밀번호" size={30} />
                                <div className="pwCheckInfo">
                                    <span>- 문자/숫자/특수문자 중 2가지 이상 조합(8~30자)</span> <br />
                                    <span>- 3개 이상 키보드 상 배열이 연속되거나 동일한 문자/숫자 제외</span>
                                </div>
                            </div>
                            <div className="pwCheck">
                                <input type="password" placeholder="비밀번호 확인" size={30} />
                            </div>
                            <div className="agreecheck">
                                <div className="agree1">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="chkall" id="chkall" />
                                        </li>
                                        <li>
                                            아래 약관에 모두 동의합니다.
                                        </li>
                                    </ul>
                                </div>
                                <hr className="line3" />
                                <div className="agree2">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="chk" id="chk" required />
                                        </li>
                                        <li>
                                            <button>서비스 이용약관(필수)</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="agree3">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="chk" id="chk" required />
                                        </li>
                                        <li>개인정보 수집 및 이용에 대한 안내(필수)</li>
                                    </ul>
                                </div>
                                <div className="agree4">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="chk" id="chk" required />
                                        </li>
                                        <li>위치정보 이용약관 동의(필수)</li>
                                    </ul>
                                </div>
                            </div>
                            <button type="submit" className="joinbtn">회원가입</button>
                        </form>
                    </div>
                    <div className="joinImg">
                        <img src="/img/snlogo.png" alt="snlogo" className="logo" />
                    </div>
                </div>
>>>>>>> 73d48fff2dfa00487783dccb13240cdb32e501d8
            </section>
        </>
    )
}

export default Join;