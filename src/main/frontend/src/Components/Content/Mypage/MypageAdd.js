import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import axios from 'axios';
import MoneyModal from "./MoneyModal";
import {Modal} from "@mui/material";
import MemberDeleteModal from "./MemberDeleteModal";
import { Add } from "@mui/icons-material";

const MypageAdd = () => {
    const [MypageAdd, setMypageAdd] = useState('');
    const [TicketSelect, setTicketSelect] = useState('당일권');
    const [selectAmount, setSelectAmount] = useState(null);
    const [selectName, setSelectName] = useState(null);
    const [selectName2, setSelectName2] = useState(null);
    const [widget, setWidget] = useState(null);
    const [TimeInfo, setTimeInfo] = useState([]);
    const [AddTimeInfo, setAddTimeInfo] = useState([]);
    const [ModalOpen, setModalOpen] = useState(false);
    const [MemberModalOpen, setMemberModalOpen] = useState(false);
    const [SipIdx, setSipIdx] = useState(1);


    const openModal = (amount, Name, Name2, SipIdx) => {
        setSelectAmount(amount);
        setSelectName(Name);
        setSelectName2(Name2);
        setSipIdx(SipIdx);
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
        if (MemberModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [MemberModalOpen]);

    useEffect(() => {
        if (ModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [ModalOpen]);


    useEffect(() => {
        axios
            .all([
                axios.get('http://localhost:8099/api/mypage/mypageTime'),
                axios.get(`http://localhost:8099/api/mypage/mypageAddTime?memberid=${sessionStorage.getItem('id')}`),
                ],
            {
                header : {'Content-Type' : 'application/json'}
            })
            .then(
                axios.spread((res1, res2) => {
                    setTimeInfo(res1.data);
                    setAddTimeInfo(res2.data);
                    console.log(AddTimeInfo);
                })
            )
            .catch(error => console.log(error))

        // axios.get("http://localhost:8099/api/mypage/mypageTime", {
        //     headers: { 'Content-Type': 'application/json' }
        // })
        //     .then(response => {
        //         setTimeInfo(response.data);
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.error('데이터 못가져옴: ', error);
        //     })
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
                    <Link to='/mypage/mypageCheck' style={{textDecoration: 'none'}}>
                        <div className="updateText2">
                            <img src="/img/icon/mypage5.png" alt="예약확인"/>
                            <span className="menuText">예약확인</span>
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
                                    <div className="Timebox2" >
                                        {/* 1시간 2시간 */}
                                        {TimeInfo ? TimeInfo.slice(0,2).map((result, index) => (
                                        <div className="SameTime" key={index}>
                                            <button onClick={() => openModal(result.sipPrice, result.sipName, result.sipName1)}>
                                                {result.sipName} <br/> {result.sipPrice}</button>
                                        </div>
                                        )) : ''}
                                    </div>
                                    <div className="Timebox2">
                                        {/* 4시간 6시간 */}
                                        {TimeInfo ? TimeInfo.slice(2,4).map((result, index) => (
                                            <div className="SameTime" key={index}>
                                                <button onClick={() => openModal(result.sipPrice, result.sipName, result.sipName1)}>
                                                    {result.sipName} <br/> {result.sipPrice}</button>
                                            </div>
                                        )) : ''}
                                    </div>
                                    <div className="Timebox2">
                                        {/* 9시간 12시간 */}
                                        {TimeInfo ? TimeInfo.slice(4,6).map((result, index) => (
                                            <div className="SameTime" key={index}>
                                                <button onClick={() => openModal(result.sipPrice, result.sipName, result.sipName1)}>
                                                    {result.sipName} <br/> {result.sipPrice}</button>
                                            </div>
                                        )) : ''}
                                    </div>
                                </div>
                            )}
                            {TicketSelect === '정기권' && (
                                <div className="TimeBox">
                                    <div className="Timebox2">
                                        {TimeInfo ? TimeInfo.slice(6,8).map((result, index) => (
                                            <div className="SameTime" key={index}>
                                                <button onClick={() => openModal(result.sipPrice, result.sipName, result.sipName1)}>
                                                    {result.sipName} <br/> {result.sipPrice}</button>
                                            </div>
                                        )) : ''}
                                    </div>
                                    <div className="Timebox2">
                                        {TimeInfo ? TimeInfo.slice(8,10).map((result, index) => (
                                            <div className="SameTime" key={index}>
                                                <button onClick={() => openModal(result.sipPrice, result.sipName, result.sipName1)}>
                                                    {result.sipName} <br/> {result.sipPrice}</button>
                                            </div>
                                        )) : ''}
                                    </div>
                                    <div className="Timebox2">
                                        {TimeInfo ? TimeInfo.slice(10,12).map((result, index) => (
                                            <div className="SameTime" key={index}>
                                                <button onClick={() => openModal(result.sipPrice, result.sipName, result.sipName1)}>
                                                    {result.sipName} <br/> {result.sipPrice}</button>
                                            </div>
                                        )) : ''}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="AddTime">
                            <div className="AddTime1">
                                <img src="/img/icon/logo.png" alt="로고"/>
<<<<<<< HEAD
                                <span>{sessionStorage.getItem("name")}님의 잔여 시간입니다</span>
                            </div>
                            <div className="AddTimeText">
                                <span>※당일권 1시간 결제하셨습니다</span>
                            </div>
                            <div className="AddStudyTime">
=======
                                <span>{sessionStorage.getItem('name')}님의 잔여 시간입니다</span>
                            </div>
                            {/* <div className="AddTimeText">
                                <span>※ 당일권 1시간 선택하셨습니다</span>
                            </div> */}
                            {/* db 로 사용시간 처리 */}
                            {/* <div className="AddStudyTime">
>>>>>>> f65fa4e0d38bdf6ac681a90c18ab585aaa8b6d95
                                <span>사용 시간</span>
                                <span>00 : 20</span>
                            </div> */}
                            <div className="AddStudyTime">
                                <span>남은 시간</span>
                                <span>{AddTimeInfo[0].museTime}시간</span>
                            </div>
                            <div className="AddStudyTime">
                                <span>남은 정기권 일 수</span>
                                <span>{AddTimeInfo[0].mendinDate === null ? "기간 없음" : AddTimeInfo[0].mendinDate}</span>
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
                widget={widget}
                TicketSelect={TicketSelect}
                Name2={selectName2}
            />
            <MemberDeleteModal
                open={MemberModalOpen}
                onClose={() => setMemberModalOpen(false)}
            />
        </div>



    )
}

export default MypageAdd;