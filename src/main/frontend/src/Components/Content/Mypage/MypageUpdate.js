import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import axios from 'axios';

const MypageUpdate = () => {
    const [MypageUpdate, setMypageUpdate] = useState('')
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('/api/mypage/mypageUpdate')
            .then((res) => {
                setMypageUpdate(res.data);
            })
            .catch(error => console.log(error))
    }, []);

    const navigateBtn = () => {
        navigate('/mypage')
    };

    const [pwType, setpwType] = useState({
        type: "password",
        visible: false,
    })

    const [pwType2, setpwType2] = useState({
        type: "password",
        visible: false,
    })

    const handlePassWordType = (e) => {
        setpwType(() => {
            if (!pwType.visible){
                return { type: "text", visible: true}
            } else {
                return { type: "password", visible: false}
            }
        });
    }

    const handlePassWordType2 = (e) => {
        setpwType2(() => {
            if (!pwType2.visible) {
                return { type: "text", visible: true}
            } else {
                return { type: "password", visible: false}
            }
        });
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
                        <Link to='/mypage' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">마이페이지</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
                <div className="Mypageheader2">
                    <div className="MypageheaderLine">
                        <Link to='/mypage/mypageUpdate' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">개인정보수정</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
            </div>

            <div className="MypageUpdate">
                <div className="MypageMenu">
                    <Link to='/mypage/mypageUpdate' style={{textDecoration: 'none'}}>
                    <div className="updateText">
                        <img src="/img/icon/mypage.png" alt="개인정보수정"/>
                        <span className="menuText">개인정보수정</span>
                    </div>
                    </Link>
                        <div className="exitMember">
                            <img src="/img/icon/arrow2.png" alt="회원탈퇴" className="arrow2" />
                            <span className="exitMember2">회원탈퇴</span>
                        </div>
                    <Link to='/mypage/mypageBoard' style={{textDecoration: 'none'}}>
                        <div className="updateText2">
                            <img src="/img/icon/mypage2.png" alt="작성한 글 확인"/>
                            <span className="menuText">작성한 글 확인</span>
                        </div>
                    </Link>
                    <Link to='/mypage/mypageReview' style={{textDecoration: 'none'}}>
                        <div className="updateText2">
                            <img src="/img/icon/mypage3.png" alt="내가 쓴 리뷰"/>
                            <span className="menuText">내가 쓴 리뷰</span>
                        </div>
                    </Link>
                    <Link to='/mypage/mypageAdd' style={{textDecoration: 'none'}}>
                        <div className="updateText2">
                            <img src="/img/icon/mypage4.png" alt="시간충전"/>
                            <span className="menuText">시간충전</span>
                        </div>
                    </Link>
                </div>

                <div className="UpdateBody">
                    <div className="UpdateBodyText">
                        <span className="UpdateText">개인정보수정</span>
                        <p>회원님께서 입력하신 정보입니다. <br/>
                            수정을 원하시면 저장버튼을 눌러주세요.</p>
                        <div className="MemberInfoBox">
                            <span className="MemberInfo">회원정보</span>
                        </div>
                        <div className="UpdateInputBox">
                            <div className="Inputspan">
                                <span>닉네임</span>
                            </div>
                            <div className="UpdateInput">
                                <input type="text" placeholder="닉네임"/>
                            </div>
                        </div>
                        <div className="UpdateInputBox">
                            <div className="Inputspan">
                                <span>아이디</span>
                            </div>
                            <div className="UpdateInput">
                                <input type="text"/>
                            </div>
                        </div>
                        <div className="UpdateInputBox">
                            <div className="Inputspan">
                                <span>비밀번호</span>
                            </div>
                            <div className="UpdateInput">
                                <input type={pwType.type} placeholder="현재 비밀번호"/>
                                <span onClick={handlePassWordType}>
                                {pwType.visible ? (
                                        <img src="/img/icon/password.png" alt="비밀번호 보기" className="UpdatepasswordIcon"/>)
                                    :
                                    (<img src="/img/icon/seepassword.png" alt="비밀번호 숨기기" className="UpdatepasswordIcon"/>
                                    )}
                            </span>
                            </div>
                        </div>
                        <div className="UpdateInputBox">
                            <div className="Inputspan">
                                <span>비밀번호 변경</span>
                            </div>
                            <div className="UpdateInput">
                                <input type={pwType2.type} placeholder="새 비밀번호"/>
                                <span onClick={handlePassWordType2}>
                                {pwType2.visible ? (
                                        <img src="/img/icon/password.png" alt="비밀번호 보기" className="UpdatepasswordIcon"/>)
                                    :
                                    (<img src="/img/icon/seepassword.png" alt="비밀번호 숨기기" className="UpdatepasswordIcon"/>
                                    )}
                            </span>
                            </div>
                        </div>
                        <div className="UpdateInputBox">
                            <div className="Inputspan">
                                <span>주소</span>
                            </div>
                            <div className="UpdateInput">
                                <input type="text" placeholder="주소"/>
                            </div>
                        </div>
                        <div className="UpdateInputBox">
                            <div className="Inputspan">
                                <span>전화번호</span>
                            </div>
                            <div className="UpdateInput">
                                <input type="text" placeholder="010-1234-5678"/>
                            </div>
                        </div>
                        <div className="saveCheck">
                            <img src="/img/icon/check.png" alt="변경사항저장" className="check"/>
                            <button onClick={navigateBtn}>변경사항 저장</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MypageUpdate;