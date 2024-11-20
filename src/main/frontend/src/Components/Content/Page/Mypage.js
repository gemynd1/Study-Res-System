import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import axios from 'axios';
import '../../../style/Mypage.css'

const Mypage = () => {
    const [Mypage, setMypage] = useState('')
    const location = useLocation();
    const { userInfo } = location.state || {};
    const navigate = useNavigate();
    const [MypageData, setMypageData] = useState('');

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
                                    <Link to='/mypage/mypageUpdate'>
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
                            <div className="circleBox">
                                <div className="circle">
                                    <Link to='/mypage/mypageCheck'>
                                        <img src="/img/icon/mypage5.png" className="mypageIcon4" alt='/'/>
                                    </Link>
                                </div>
                                <span className="mypageIcon5">예약확인</span>
                            </div>
                        </div>
                        <div className="AccountInput">
                            <img src="/img/icon/logo.png" className="logo" alt="/"/>
                            <span className="editText">고객문의 / 고객센터</span>
                        </div>
                        <div className="MypageSelect">
                            <div className="circleBox">
                                <div className="circle">
                                <Link to='/CustomerHelp/CustomerWrite'>
                                        <img src='/img/icon/customerWrite.png' alt="문의하기"
                                             style={{width: "60px", height: "60px"}}/>
                                        {/*<span className="Inquiry">1</span>*/}
                                    </Link>
                                </div>
                                <span className="InquiryText">문의하기</span>
                            </div>
                            <div className="circleBox">
                                <div className="circle">
                                    <Link to='/CustomerHelp/CustomerDetail'>
                                        <img src='/img/icon/customerHistory.png' alt="문의내역"
                                             style={{width: "60px", height: "60px"}}/>
                                    </Link>
                                </div>
                                <span className="InquiryText2">문의내역</span>
                            </div>
                            <div className="circleBox">
                                <div className="circle">
                                    <Link to='/CustomerHelp/CustomerService'>
                                        <img src='/img/icon/call(black).png' alt="고객센터"
                                             style={{width: "60px", height: "60px"}}/>
                                    </Link>
                                </div>
                                <span className="InquiryText3">고객센터</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Mypage;