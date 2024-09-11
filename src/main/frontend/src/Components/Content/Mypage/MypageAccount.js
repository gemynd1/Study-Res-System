import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import axios from 'axios';
import '../../../style/Mypage.css'

const MypageAccount = () => {
    const [MypageAccount, setMypageAccount] = useState('')

    useEffect(() => {
        axios.get('/api/mypage/mypageAccount')
            .then((res) => {
                setMypageAccount(res.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <div className="MyPage">
            <div className="Mypageheader">
                <div className="MypageHome">
                    <Link to='/'>
                        <img src="/img/icon/home.png" alt='/' className="icon"/>
                    </Link>
                </div>
                <div className="Mypageheader2">
                    <div className="MypageheaderLine">
                        <Link to='/mypage' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">마이페이지</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
                <div className="Mypageheader2">
                    <div className="MypageheaderLine">
                        <Link to='/mypage/mypageAccount' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">개인정보수정</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
            </div>


            <div className="AccountBody">
                <div className="editPersonal">
                    <span className="AccountText">개인정보수정</span>
                </div>
                <div className="AccountInput">
                    <img src="/img/icon/logo.png" className="logo" alt="/" />
                    <span className="editText">개인정보수정</span>
                </div>
                <div className="AccountInput2">
                    <span className="editText2">회원님의 개인정보는 본인 동 없이 절대 공개되지 않습니다.</span>
                </div>
                <div className="AccountInputID">
                    <div className="AccountInput3">
                        <span className="AccountID">아이디</span>
                    </div>
                    <div className="AccountInputID2">
                        <input className="AccountExist"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MypageAccount;