import React, { useEffect, useState, useRef, useCallback } from "react";
import "../../../style/Main.css"
import axios from "axios";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import "swiper/css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 6,
    boxShadow: 24,
}

// 숫자 자동으로 올려주는 함수들
function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountNum(end, start = 0, duration = 2000) {
    const [count, setCount] = useState(start);
    const frameRate = 1000 / 60;
    const totalFrame = Math.round(duration / frameRate);

    useEffect(() => {
        let currentNumber = start;
        const counter = setInterval(() => {
        const progress = easeOutExpo(++currentNumber / totalFrame);
        setCount(Math.round(end * progress));

        if (progress === 1) {
            clearInterval(counter);
        }
    }, frameRate);

      // 컴포넌트가 언마운트될 때 인터벌 정리
        return () => clearInterval(counter);
    }, [end, frameRate, start, totalFrame]);

    return count;
}

const BasicModal = ({ open, handleClose, selectedItem }) => {
    // console.log(selectedItem)
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modal-seat-header">
                        <span className="modal-seat-header-title">{selectedItem}</span>
                    </div>
                    <div className="modal-seat-title-section">
                            <div>
                                <span className="modal-seat-title">{selectedItem}</span><br />
                                <span className="modal-seat-content">{selectedItem}</span>
                            </div> 
                    </div>
                    <div className="modal-seat-button-section">
                        <div onClick={handleClose} className="modal-seat-active-button">
                            <span className="modal-active-text">확인</span>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )  
}

const Main = () => {
    const [startAnimation, setStartAnimation] = useState(false);
    const sectionRef = useRef(null);

    const monthlyUsers = useCountNum(startAnimation ? 5000 : 0, 0, 2000);
    const totalUsers = useCountNum(startAnimation ? 100000 : 0, 0, 2000);
    const satisfaction = useCountNum(startAnimation ? 100 : 0, 0, 2000);

    const [StudyGInfo, setStudyGInfo] = useState([]); // 스터디룸 정보
    const [StudyInInfo, setStudyInInfo] = useState([]); // 개인좌석 정보
    const baseUrl = "http://localhost:8099";

    const [openModal, setOpenModal] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    
    const [seatCount, setSeatCount] = useState({
        seatCount1 : 0,
        seatCount2 : 0,    
        seatCount3 : 0,
    });

    const modules = [Autoplay];

    // 숫자에 콤마 찍어주는 함수들
    const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const sectionTop = sectionRef.current.getBoundingClientRect().top;
                const sectionBottom = sectionRef.current.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;
        
                // 컴포넌트가 화면에 진입할 때 (화면 하단에 도달하거나, 화면에서 벗어났다가 다시 보일 때)
                if (sectionTop < windowHeight && sectionBottom > 0) {
                    setStartAnimation(true); // 애니메이션 시작
                } else {
                    setStartAnimation(false); // 다시 스크롤하면 애니메이션 리셋
                }
            }
        };
    
        // 브라우저 실행하면 자동 실행
        setStartAnimation(true);
        window.addEventListener('scroll', handleScroll);
    
        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        axios
            .all([axios.get(baseUrl + '/api/studygInfo'), axios.get(baseUrl + '/api/studyininfo')], {
                headers : { 'Content-Type': 'application/json' }
            })
            .then(
                axios.spread((res1, res2) => {
                    setStudyGInfo(res1.data);
                    setStudyInInfo(res2.data);
                    setTimeout(() => {
                        const seats = document.querySelectorAll('.seat');
                        const seatSelect = document.querySelectorAll('.selectedSeat');
                        
                        setSeatCount(prevState => ({
                            ...prevState,
                            seatCount1 : seats.length,
                            seatCount2 : seatSelect.length,    
                            seatCount3 : seats.length - seatSelect.length,
                        }));
                    }, 10)
                })
            )
            .catch(error => console.log(error))
    }, []);

    // 모달 열기
    const handleOpenModal = (item) => {
        setSelectedSeat(item);
        setOpenModal(true);
    }

    // 모달 닫기
    const handleCloseModal = () => {
        setOpenModal(false);    
        setSelectedSeat(null);  
    };

    return(
        <>
            <section className="MainSection1" ref={sectionRef}>
                <div className="MainHeader">
                    <span className="MainHeader-first">SN 스터디카페입니다.</span><br />
                    {/* <span className="MainHeader-first">{sessionStorage.getItem('name')}</span><br /> */}
                    <span className="MainHeader-second">연성대학교 학생들을 위한 스터디카페 입니다.</span>
                </div>
                <div className="MainContent">
                    <div className="MainContent-content1">
                        <span className="MainContent-content1-first">월 평균 사용자</span><br />
                        <span className="MainContent-content1-second">{addComma(monthlyUsers)}</span>
                        <span className="MainContent-content1-third">명</span>
                    </div>
                    <div className="MainContent-content2">
                        <span className="MainContent-content2-first">누적 사용자</span><br />
                        <span className="MainContent-content2-second">{addComma(totalUsers)}</span>
                        <span className="MainContent-content2-third">명</span>
                    </div>
                    <div className="MainContent-content3">
                        <span className="MainContent-content3-first">사용 만족도</span><br />
                        <span className="MainContent-content3-second">{addComma(satisfaction)}</span>
                        <span className="MainContent-content3-third">%</span>
                    </div>
                </div>
            </section>
            <section className="MainSection2">
                <div className="MainSec2-title">
                    <h1>
                        스터디룸
                    </h1>
                </div>
                <Swiper
                    slidesPerView={3} // 한번에 보여지는 slide 개수
                    spaceBetween={35} // slide간의 간격
                    loopedSlides={2}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{ // 반응형 구현
                        1200: {
                            centeredSlides:true,
                            slidesPerView: 4.5,
                        }, // width 값이 1200이 넘을때 실행
                    }}
                    modules={modules}
                    className={'mySwiper sec2-swiper'}
                >
                    <div>
                        {StudyGInfo ? StudyGInfo.map((datas) => (
                            <div key={"studyginfo" + datas.sginum}>
                                <SwiperSlide>
                                    <Link to="/">
                                        <div className="img-box">
                                            <img src={datas.studyGImgVo.sgimg} alt="room1" />
                                        </div>
                                        <div className="txt-box">
                                            <h4>
                                                {datas.sgicontent2}
                                            </h4>
                                            <dl>
                                                <dt>
                                                    {datas.sgicontent1}
                                                </dt>
                                            </dl>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            </div>
                        )) : ''}
                    </div>
                    {/* <SwiperSlide>
                        <Link to="/">
                            <div className="img-box">
                                <img src="/img/room/study room0-1.png" alt="room1" />
                            </div>
                            <div className="txt-box">
                                <h4>스터디룸은 학습이나 작업을 위한 전용 공간으로, 
                                    개별이나 그룹으로 사용될 수 있는 공간입니다. 
                                    주로 조용하고 집중하기 좋은 환경을 제공하여 학업이나 
                                    업무에 집중할 수 있도록 돕습니다.
                                </h4>
                                <dl>
                                    <dt>수성방</dt>
                                </dl>
                            </div>
                        </Link>
                    </SwiperSlide>
                    */}
                </Swiper>
            </section>
            <section className="MainSection3">
                <div className="MainSec3-title">
                    <h1>
                        개인좌석
                    </h1>
                </div>
                <div className="seatContainer1">
                    <ul className="showcase">
                        <li>
                            <div className="availableSeat"></div>
                            <small className="small">빈자리</small>
                        </li>
                        <li>
                            <div className="selectedSeatIcon"></div>
                            <small className="small">사용중인 자리</small>
                        </li>
                    </ul>
                    <div className="seatContainer">
                        {StudyInInfo.map((studyininfogroup, groupIndex) => (
                            <div key={"group" + groupIndex} className="row">
                                {studyininfogroup.map((studyininfo, infoIndex) => (
                                    studyininfo.seatUseState === "N" ? 
                                        <React.Fragment key={"info" + infoIndex}>
                                            <span 
                                                className="seat" 
                                                id={"seat" + studyininfo.siinum}
                                                onClick={() => 
                                                    sessionStorage.getItem("id") === null ? '' : handleOpenModal(studyininfo.siinum)
                                                } 
                                            />
                                        </React.Fragment>
                                    :
                                        <React.Fragment key={"info"  + infoIndex}>
                                            <span className="seat selectedSeat" id={"seat" + studyininfo.siinum} />
                                            <input type="hidden" value={studyininfo.seatStartTime ? studyininfo.seatStartTime : ""} />
                                            <input type="hidden" value={studyininfo.seatEndTime ? studyininfo.seatEndTime : ""} />
                                        </React.Fragment>
                                ))}
                            </div>
                        ))}
                    {/* {StudyInInfo.map((studyininfogroup, groupIndex) => {
                    console.log(`group-${groupIndex}`);
                    return (
                        <div key={`group-${groupIndex}`} className="row">
                            {studyininfogroup.map((studyininfo, infoIndex) => {
                                const key = `group-${groupIndex}-seat-${studyininfo.siinum}`;
                                console.log(key);
                                return studyininfo.seatUseState === "N" ? (
                                    <React.Fragment key={key}>
                                        <span 
                                            className="seat" 
                                            id={"seat" + studyininfo.siinum}
                                            onClick={() => 
                                                sessionStorage.getItem("id") === null ? '' : handleOpenModal(studyininfo.siinum)
                                            } 
                                        />
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment key={`${key}-selected`}>
                                        <span className="seat selectedSeat" id={"seat" + studyininfo.siinum} />
                                        <input type="hidden" value={studyininfo.seatStartTime ? studyininfo.seatStartTime : ""} />
                                        <input type="hidden" value={studyininfo.seatEndTime ? studyininfo.seatEndTime : ""} />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    );
                })} */}
                        

                        {/* <div className="row">
                            <span className="seat selectedSeat" id="seat1"></span>
                            <span className="seat" id="seat2"></span>
                            <span className="seat selectedSeat" id="seat3"></span>
                            <span className="seat" id="seat4"></span>
                            <span className="seat" id="seat5"></span>
                            <span className="seat" id="seat6"></span>
                        </div>
                        */}
                    </div>
                </div>
                <p className="text">
                    <img src={'/img/icon/arrow.png'} /> 총 좌석 <span id="totalcount">&nbsp; {seatCount.seatCount1 > 0 ? seatCount.seatCount1 : "로딩 중..."}</span>&nbsp;
                    <img src={"/img/icon/arrow.png"} /> 사용 중 <span id="usecount">&nbsp; {seatCount.seatCount2}</span>&nbsp;
                    <img src={"/img/icon/arrow.png"} /> 남은 자리 <span id="leftcount">&nbsp; {seatCount.seatCount3}</span>
                </p>
            </section>
            {/* 모달 컴포넌트 */}
            <BasicModal 
                open={openModal} 
                handleClose={handleCloseModal} 
                seatInfo={selectedSeat}
            />
        </>
    )
}

export default Main;