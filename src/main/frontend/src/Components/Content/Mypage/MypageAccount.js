import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../../style/Mypage.css';
import MypageUpdate from "./MypageUpdate";

const MypageAccount = () => {
    const [MypageAccount, setMypageAccount] = useState('');
    const navigate = useNavigate();
    const [id, setId] = useState(sessionStorage.getItem("id"));
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [phone, setPhone] = useState('');

    const [userInfo, setUserInfo] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(sessionStorage.getItem("id") === id) {
            axios.get("http://localhost:8099/api/mypage/mypageAccount", {
                params: { id, pw },
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            })
                .then(response => {
                    // setUserInfo(response.data);
                    sessionStorage.setItem("loginState", response.data);
                    navigate('/mypage');
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                    alert('아이디 또는 비밀번호가 맞지 않습니다.')
                })
        } else {
            alert('아이디 또는 비밀번호가 맞지 않습니다.')
            return null;
        }
    }

    const [pwType, setPwType] = useState({ type: "password", visible: false });

    const handlePassWordType = () => {
        setPwType(prevPwType => ({
            type: prevPwType.visible ? "password" : "text",
            visible: !prevPwType.visible
        }));
    };

    return (
        <div className="MyPage">
            <div className="Mypageheader">
                <Link to='/'>
                    <div className="MypageHome">
                        <img src="/img/icon/home.png" alt='/' className="icon"/>
                    </div>
                </Link>
                <div className="Mypageheader2">
                    <div className="MypageheaderLine">
                        <Link to='/mypage' style={{ textDecoration: 'none' }}>
                            <span className="mypagetext">마이페이지</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
                <div className="Mypageheader2">
                    <div className="MypageheaderLine">
                        <Link to='/mypage/mypageAccount' style={{ textDecoration: 'none' }}>
                            <span className="mypagetext">개인정보수정</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
            </div>

            <div className="AccountBody">
                <div className="editPersonal">
                    <span className="AccountText">마이페이지</span>
                </div>
                <div className="AccountInput">
                    <img src="/img/icon/logo.png" className="logo" alt="/"/>
                    <span className="editText">마이페이지</span>
                </div>
                <div className="AccountInput2">
                    <span className="editText2">회원님의 개인정보는 본인 동의 없이 절대 공개되지 않습니다.</span>
                </div>

                <form className="form-content" onSubmit={onSubmit}>
                    <div className="InputBody">
                        <div className="AccountInputID">
                            <div className="AccountInput3">
                                <span className="AccountID">아이디</span>
                            </div>
                            <div className="AccountInputID2">
                                <input
                                    className="AccountExist"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="AccountInputID">
                            <div className="AccountInput4">
                                <span className="AccountID">비밀번호</span>
                            </div>
                            <div className="AccountInputID4">
                                <input
                                    type={pwType.type}
                                    className="AccountExist"
                                    placeholder="비밀번호를 입력해주세요."
                                    onChange={(e) => setPw(e.target.value)}
                                />
                                <span onClick={handlePassWordType}>
                                    {pwType.visible ? (
                                            <img src="/img/icon/password.png" alt="비밀번호 보기" className="passwordIcon"/> )
                                        :
                                        (<img src="/img/icon/seepassword.png" alt="비밀번호 숨기기" className="passwordIcon" />
                                        )}
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="AccountBtn">확인</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MypageAccount;
