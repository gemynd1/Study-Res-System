import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import '../../../style/Mypage.css';

const CustomerService = () => {

    const [helpBox, setHelpBox] = useState(false);
    const [helpBox2, setHelpBox2] = useState(false);
    const [helpBox3, setHelpBox3] = useState(false);
    const [helpBox4, setHelpBox4] = useState(false);
    const [helpBox5, setHelpBox5] = useState(false);
    const [helpBox6, setHelpBox6] = useState(false);

    const handleClick = (boxIndex) => {
        setHelpBox(prevState => (boxIndex === 1 ? !prevState : false));
        setHelpBox2(prevState => (boxIndex === 2 ? !prevState : false));
        setHelpBox3(prevState => (boxIndex === 3 ? !prevState : false));
        setHelpBox4(prevState => (boxIndex === 4 ? !prevState : false));
        setHelpBox5(prevState => (boxIndex === 5 ? !prevState : false));
        setHelpBox6(prevState => (boxIndex === 6 ? !prevState : false));
    };

    const handleCloseClick = () => {
        setHelpBox(false);
        setHelpBox2(false);
        setHelpBox3(false);
        setHelpBox4(false);
        setHelpBox5(false);
        setHelpBox6(false);

    }

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
                        <Link to='/CustomerService' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">고객센터</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
                <div className="CustomerServiceIcon">
                    <div className="CustomerService">
                        <Link to='/CustomerWrite' style={{ textDecoration: "none", display: "contents"}}>
                            <span>문의하기</span>
                            <img src='/img/icon/customerWrite.png' alt="문의하기" style={{width: "30px", height: "30px"}}/>
                        </Link>
                        <Link to='/' style={{ textDecoration: "none", display: "contents"}}>
                            <span>문의내역</span>
                            <img src='/img/icon/customerHistory.png' alt="문의하기" style={{width: "30px", height: "30px"}}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="CustomerBody">
                <div className="CustomerBanner">
                    <span className="CustomerBodyText">SN스터디 고객센터</span>
                </div>
                <div className="helpText">
                    <span>자주 찾는 도움말</span>
                </div>
                <div className="CustomerBox">
                    <button onClick={() => handleClick(1)} className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 결제 문의 안내</span>
                        </div>
                    </button>

                    <button onClick={() => handleClick(2)} className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 개인 좌석 이용방법</span>
                        </div>
                    </button>

                    <button onClick={() => handleClick(3)} className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 룸 대여 이용방법</span>
                        </div>
                    </button>
                </div>
                {helpBox && (
                    <div className="newDiv">
                        <div className="newDivHeader">
                            <div className="HeaderText">
                                <span>Q. 결제 문의 안내</span>
                                <button onClick={handleCloseClick} className="closeBtn">
                                    <img src="/img/icon/close.png" alt="닫기"
                                         style={{width: "30px", height: "30px", marginRight: "50px"}}/>
                                </button>

                            </div>
                        </div>
                        <div className="BodyText">
                            <span>결제 문의는 고객센터로 문의 바랍니다.</span>
                        </div>
                    </div>
                )}
                {helpBox2 && (
                    <div className="newDiv">
                        <div className="newDivHeader">
                            <div className="HeaderText">
                                <span>Q. 개인 좌석 이용방법</span>
                                <button onClick={handleCloseClick} className="closeBtn">
                                    <img src="/img/icon/close.png" alt="닫기"
                                         style={{width: "30px", height: "30px", marginRight: "50px"}}/>
                                </button>
                            </div>
                        </div>
                        <div className="BodyText">
                            <span>결제 문의는 고객센터로 문의 바랍니다.</span>
                        </div>
                    </div>
                )}
                {helpBox3 && (
                    <div className="newDiv">
                        <div className="newDivHeader">
                            <div className="HeaderText">
                                <span>Q. 룸 대여 이용방법</span>
                                <button onClick={handleCloseClick} className="closeBtn">
                                    <img src="/img/icon/close.png" alt="닫기"
                                         style={{width: "30px", height: "30px", marginRight: "50px"}}/>
                                </button>

                            </div>
                        </div>
                        <div className="BodyText">
                            <span>결제 문의는 고객센터로 문의 바랍니다.</span>
                        </div>
                    </div>
                )}

                <div className="CustomerBox">
                    <button onClick={() => handleClick(4)} className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 게시판 사용 안내</span>
                        </div>
                    </button>

                    <button onClick={() => handleClick(5)} className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 룸 대여 모임 안내</span>
                        </div>
                    </button>

                    <button onClick={() => handleClick(6)} className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 인원 추가 및 삭제 안내</span>
                        </div>
                    </button>
                </div>
                {helpBox4 && (
                    <div className="newDiv">
                        <div className="newDivHeader">
                            <div className="HeaderText">
                                <span>Q. 게시판 사용 안내</span>
                                <button onClick={handleCloseClick} className="closeBtn">
                                    <img src="/img/icon/close.png" alt="닫기"
                                         style={{width: "30px", height: "30px", marginRight: "50px"}}/>
                                </button>
                            </div>
                        </div>
                        <div className="BodyText">
                            <span>결제 문의는 고객센터로 문의 바랍니다.</span>
                        </div>
                    </div>
                )}
                {helpBox5 && (
                    <div className="newDiv">
                        <div className="newDivHeader">
                            <div className="HeaderText">
                                <span>Q. 룸 대여 모임 안내</span>
                                <button onClick={handleCloseClick} className="closeBtn">
                                    <img src="/img/icon/close.png" alt="닫기"
                                         style={{width: "30px", height: "30px", marginRight: "50px"}}/>
                                </button>
                            </div>
                        </div>
                        <div className="BodyText">
                            <span>결제 문의는 고객센터로 문의 바랍니다.</span>
                        </div>
                    </div>
                )}
                {helpBox6 && (
                    <div className="newDiv">
                        <div className="newDivHeader">
                            <div className="HeaderText">
                                <span>Q. 인원 추가 및 삭제 안내</span>
                                <button onClick={handleCloseClick} className="closeBtn">
                                    <img src="/img/icon/close.png" alt="닫기"
                                         style={{width: "30px", height: "30px", marginRight: "50px"}}/>
                                </button>
                            </div>
                        </div>
                        <div className="BodyText">
                            <span>결제 문의는 고객센터로 문의 바랍니다.</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerService;