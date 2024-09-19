import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import axios from 'axios';
import '../../../style/Mypage.css'

const Mypage = () => {
    const [Mypage, setMypage] = useState('')

    useEffect(() => {
        axios.get('/api/mypage')
            .then((res) => {
                setMypage(res.data);
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
            </div>

            <div className="AccountBody">
                <div className="mypageBox">
                    <div className="editPersonal">
                        <span className="AccountText">나의 활동</span>
                    </div>
                    <div className="AccountInput">
                        <img src="/img/icon/logo.png" className="logo" alt="/"/>
                        <span className="editText">나의 활동</span>
                    </div>
                    <div className="MypageSelect">
                        <div className="circleBox">
                            <div className="circle">
                                <Link to='/mypage/mypageAccount'>
                                    <img src="/img/icon/mypage.png" className="mypageIcon" alt='/'/>
                                </Link>
                            </div>
                            <span className="mypageIcon1">개인정보수정</span>
                        </div>
                        <div className="circleBox">
                            <div className="circle">
                                <Link to='/mypage/mypageBoard'>
                                    <img src="/img/icon/mypage2.png" className="mypageIcon" alt='/'/>
                                </Link>
                            </div>
                            <span className="mypageIcon2">작성한 글 확인</span>
                        </div>
                        <div className="circleBox">
                            <div className="circle">
                                <Link to='/mypage/mypageReview'>
                                    <img src="/img/icon/mypage3.png" className="mypageIcon" alt='/'/>
                                </Link>
                            </div>
                            <span className="mypageIcon3">내가 쓴 리뷰</span>
                        </div>
                        <div className="circleBox">
                            <div className="circle">
                                <Link to='/mypage/mypageAdd'>
                                    <img src="/img/icon/mypage4.png" className="mypageIcon4" alt='/'/>
                                </Link>
                            </div>
                            <span className="mypageIcon5">시간충전</span>
                        </div>
                    </div>
                    <div className="AccountInput">
                        <img src="/img/icon/logo.png" className="logo" alt="/"/>
                        <span className="editText">고객문의 / 완료건수</span>
                    </div>
                    <div className="MypageSelect">
                        <div className="circleBox">
                            <div className="circle">
                                <span className="Inquiry">1</span>
                            </div>
                            <span className="InquiryText">문의 신청 건</span>
                        </div>
                        <div className="circleBox">
                            <div className="circle">
                                <span className="Inquiry">1</span>
                            </div>
                            <span className="InquiryText2">문의 임시저장 건</span>
                        </div>
                        <div className="circleBox">
                            <div className="circle">
                                <span className="Inquiry">1</span>
                            </div>
                            <span className="InquiryText3">문의 완료 건</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mypage;