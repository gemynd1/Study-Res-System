import React, { useEffect, useState, useRef } from "react";
import "../../../style/Main.css"
import axios from "axios";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";

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

const Main = () => {
    const [comma, setComma] = useState(0);
    const [startAnimation, setStartAnimation] = useState(false);
    const sectionRef = useRef(null);

    const monthlyUsers = useCountNum(startAnimation ? 5000 : 0, 0, 2000);
    const totalUsers = useCountNum(startAnimation ? 100000 : 0, 0, 2000);
    const satisfaction = useCountNum(startAnimation ? 100 : 0, 0, 2000);

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

    const modules = [Autoplay];

    // db 테스트
    // const [hello, setHello] = useState([]);
    // const baseUrl = "http://localhost:8099";
    
    // useEffect(() => {
    //     axios.get(baseUrl + '/api/main')
    //         .then((res) => {
    //             console.log(res.data);
    //             setHello(res.data)
    //         })
    //         .catch(error => console.log(error))
    // }, []); 

    return(
        <>
            
            <section className="MainSection1" ref={sectionRef}>
                <div className="MainHeader">
                    {/* <div>
                        {hello ? hello.map((datas) => (
                            <div key={datas.classidx}>
                                <span className="MainHeader-first">{datas.classname}</span><br />
                            </div>
                        )) : ''}
                    </div> */}
                    <span className="MainHeader-first">SN 스터디카페 입니다</span><br />
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
                    <SwiperSlide>
                        <Link to="/">
                            <div className="img-box">
                                <img src="/img/room/study room1-1.png" alt="room1" />
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
                    <SwiperSlide>
                        <Link to="/">
                            <div className="img-box">
                                <img src="/img/room/study room1-1.png" alt="room1" />
                            </div>
                            <div className="txt-box">
                                <h4>스터디룸은 학습이나 작업을 위한 전용 공간으로, 
                                    개별이나 그룹으로 사용될 수 있는 공간입니다. 
                                    주로 조용하고 집중하기 좋은 환경을 제공하여 학업이나 
                                    업무에 집중할 수 있도록 돕습니다.
                                </h4>
                                <dl>
                                    <dt>금성방</dt>
                                </dl>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="img-box">
                                <img src="/img/room/study room1-1.png" alt="room1" />
                            </div>
                            <div className="txt-box">
                                <h4>스터디룸은 학습이나 작업을 위한 전용 공간으로, 
                                    개별이나 그룹으로 사용될 수 있는 공간입니다. 
                                    주로 조용하고 집중하기 좋은 환경을 제공하여 학업이나 
                                    업무에 집중할 수 있도록 돕습니다.
                                </h4>
                                <dl>
                                    <dt>지구방</dt>
                                </dl>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="img-box">
                                <img src="/img/room/study room1-1.png" alt="room1" />
                            </div>
                            <div className="txt-box">
                                <h4>스터디룸은 학습이나 작업을 위한 전용 공간으로, 
                                    개별이나 그룹으로 사용될 수 있는 공간입니다. 
                                    주로 조용하고 집중하기 좋은 환경을 제공하여 학업이나 
                                    업무에 집중할 수 있도록 돕습니다.
                                </h4>
                                <dl>
                                    <dt>화성방</dt>
                                </dl>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="img-box">
                                <img src="/img/room/study room1-1.png" alt="room1" />
                            </div>
                            <div className="txt-box">
                                <h4>스터디룸은 학습이나 작업을 위한 전용 공간으로, 
                                    개별이나 그룹으로 사용될 수 있는 공간입니다. 
                                    주로 조용하고 집중하기 좋은 환경을 제공하여 학업이나 
                                    업무에 집중할 수 있도록 돕습니다.
                                </h4>
                                <dl>
                                    <dt>달방</dt>
                                </dl>
                            </div>
                        </Link>
                    </SwiperSlide>
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
                        <div className="row">
                            <span className="seat selectedSeat" id="seat1"></span>
                            <span className="seat" id="seat2"></span>
                            <span className="seat selectedSeat" id="seat3"></span>
                            <span className="seat" id="seat4"></span>
                            <span className="seat" id="seat5"></span>
                            <span className="seat" id="seat6"></span>
                        </div>
                        <div className="row">
                            <span className="seat" id="seat7"></span>
                            <span className="seat" id="seat8"></span>
                            <span className="seat" id="seat9"></span>
                            <span className="seat" id="seat10"></span>
                            <span className="seat" id="seat11"></span>
                            <span className="seat" id="seat12"></span>
                        </div>
                        <div className="row">
                            <span className="seat" id="seat13"></span>
                            <span className="seat" id="seat14"></span>
                            <span className="seat" id="seat15"></span>
                            <span className="seat" id="seat16"></span>
                            <span className="seat" id="seat17"></span>
                            <span className="seat" id="seat18"></span>
                        </div>
                        <div className="row">
                            <span className="seat" id="seat19"></span>
                            <span className="seat" id="seat20"></span>
                            <span className="seat" id="seat21"></span>
                            <span className="seat" id="seat22"></span>
                            <span className="seat" id="seat23"></span>
                            <span className="seat" id="seat24"></span>
                        </div>
                        <div className="row">
                            <span className="seat" id="seat25"></span>
                            <span className="seat" id="seat26"></span>
                            <span className="seat" id="seat27"></span>
                            <span className="seat" id="seat28"></span>
                            <span className="seat" id="seat29"></span>
                            <span className="seat" id="seat30"></span>
                        </div>
                        <div className="row">
                            <span className="seat" id="seat31"></span>
                            <span className="seat" id="seat32"></span>
                            <span className="seat" id="seat33"></span>
                            <span className="seat" id="seat34"></span>
                            <span className="seat" id="seat35"></span>
                            <span className="seat" id="seat36"></span>
                        </div>
                    </div>
                </div>
                <p className="text">
                    <img src="/img/icon/arrow.png" /> 총 좌석 <span id="totalcount">&nbsp; 3</span>&nbsp;
                    <img src="/img/icon/arrow.png" /> 사용 중 <span id="usecount">&nbsp; 4</span>&nbsp;
                    <img src="/img/icon/arrow.png" /> 남은 자리 <span id="leftcount">&nbsp; 5</span>
                </p>
            </section>
        </>
    )
}

export default Main;