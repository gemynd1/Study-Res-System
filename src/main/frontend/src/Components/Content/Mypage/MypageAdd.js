import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import axios from 'axios';
import MoneyModal from "./MoneyModal";
import {Modal} from "@mui/material";
import MemberDeleteModal from "./MemberDeleteModal";

const MypageAdd = () => {
    const [MypageAdd, setMypageAdd] = useState('');
    const [TicketSelect, setTicketSelect] = useState('당일권');
    const [selectAmount, setSelectAmount] = useState(null);
    const [selectName, setSelectName] = useState(null);


    const [ModalOpen, setModalOpen] = useState(false);
    const [MemberModalOpen, setMemberModalOpen] = useState(false);


    const openModal = (amount, Name) => {
        setSelectAmount(amount);
        setSelectName(Name)
        setModalOpen(true);
    }

    const MemberOpenModal = () => {
        setMemberModalOpen(true);
    }

    const MemberCloseModal = () => {
        setMemberModalOpen(false);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        axios.get('/api/mypage/mypageAdd')
            .then((res) => {
                setMypageAdd(res.data);
            })
            .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        if (MemberModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [MemberModalOpen]);


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
                        <Link to='/mypage/mypageAdd' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">시간충전</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
            </div>

            <div className="MypageAdd">
                <div className="MypageMenu">
                    <Link to='/mypage/mypageUpdate' style={{textDecoration: 'none' }}>
                        <div className="updateText">
                            <img src="/img/icon/mypage.png" alt="개인정보수정"/>
                            <span className="menuText">개인정보수정</span>
                        </div>
                    </Link>
                    <div className="exitMember">
                        <img src="/img/icon/arrow2.png" alt="회원탈퇴" className="arrow2" />
                        <button onClick={() => MemberOpenModal()} className="exitMember2">회원탈퇴</button>
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
                    <div className="AddBodyText">
                        <span className="AddText">시간충전</span>
                    </div>
                    <div className="AddAllBox">
                        <div className="AddBox">
                            <div className="TicketBox">
                                <div className="TicketBox1">
                                    <button className={TicketSelect === '당일권' ? 'active' : ''} onClick={() => setTicketSelect('당일권')}>
                                        당일권
                                    </button>
                                </div>
                                <div className="TicketBox2">
                                    <button className={TicketSelect === '정기권' ? 'active' : ''} onClick={() => setTicketSelect('정기권')}>
                                        정기권
                                    </button>
                                </div>
                            </div>
                            {TicketSelect === '당일권' && (
                                <div className="TimeBox">
                                    <div className="Timebox2">
                                        <div className="SameTime">
                                            <button onClick={() => openModal("1,500", "당일권 1시간")}>당일권 1시간 <br/> 1,500원</button>

                                        </div>
                                        <div className="SameTime">
                                            <button onClick={() => openModal("3,000", "당일권 2시간")}>당일권 2시간 <br/> 3,000원</button>
                                        </div>
                                    </div>
                                    <div className="Timebox2">
                                        <div className="SameTime">
                                            <button onClick={() => openModal("5,000", "당일권 4시간")}>당일권 4시간 <br/> 5,000원</button>
                                        </div>
                                        <div className="SameTime">
                                            <button onClick={() => openModal("6,000", "당일권 6시간")}>당일권 6시간 <br/> 6,000원</button>
                                        </div>
                                    </div>
                                    <div className="Timebox2">
                                        <div className="SameTime">
                                            <button onClick={() => openModal("8,000", "당일권 9시간")}>당일권 9시간 <br/> 8,000원</button>
                                        </div>
                                        <div className="SameTime">
                                            <button onClick={() => openModal("10,000", "당일권 12시간")}>당일권 12시간 <br/> 10,000원</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {TicketSelect === '정기권' && (
                                <div className="TimeBox">
                                    <div className="Timebox2">
                                        <div className="SameTime">
                                            <button onClick={() => openModal("45,000", "종일권 30시간")}>종일권 30시간 <br/> 45,000원</button>
                                        </div>
                                        <div className="SameTime">
                                            <button onClick={() => openModal("60,000", "정기권 50시간")}>정기권 50시간 <br/> 60,000원</button>
                                        </div>
                                    </div>
                                    <div className="Timebox2">
                                        <div className="SameTime">
                                            <button onClick={() => openModal("110,000", "정기권 100시간")}>정기권 100시간 <br/> 110,000원</button>
                                        </div>
                                        <div className="SameTime">
                                            <button onClick={() => openModal("120,000", "정기구너 4주 자유 이용권")}>정기권 4주 자유 이용권<br/> 120,000원</button>
                                        </div>
                                    </div>
                                    <div className="Timebox2">
                                        <div className="SameTime">
                                            <button onClick={() => openModal("230,000", "정기권 8주 자유 이용권")}>정기권 8주 자유 이용권<br/> 230,000원</button>
                                        </div>
                                        <div className="SameTime">
                                            <button onClick={() => openModal("800,000", "정기권 1년 이용권")}>정기권 1년 이용권<br/> 800,000</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="AddTime">
                            <div className="AddTime1">
                                <img src="/img/icon/logo.png" alt="로고"/>
                                <span>정희수님의 잔여 시간입니다</span>
                            </div>
                            <div className="AddTimeText">
                                <span>※당일권 1시간 선택하셨습니다</span>
                            </div>
                            <div className="AddStudyTime">
                                <span>사용 시간</span>
                                <span>00 : 20</span>
                            </div>
                            <div className="AddStudyTime">
                                <span>남은 시간</span>
                                <span>00 : 40</span>
                            </div>
                            <div className="AddStudyTime">
                                <span>남은 정기권 일 수</span>
                                <span>00일</span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <MoneyModal
                open={ModalOpen}
                onClose={() => setModalOpen(false)}
                amount={selectAmount}
                Name={selectName}
            />
            <MemberDeleteModal
                open={MemberModalOpen}
                onClose={() => setMemberModalOpen(false)}
            />
        </div>



    )
}

export default MypageAdd;