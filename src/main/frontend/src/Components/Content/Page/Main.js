import React, { useEffect, useState, useRef } from "react";
import "../../../style/Main.css"
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

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

    const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }
        
    const onChangePoints = (e) => {
        const { value } = e.target;
        let str = value.replaceAll(",", "");
        setComma(str);
    };

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
    
        setStartAnimation(true);
        window.addEventListener('scroll', handleScroll);
    
        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const modules = [Autoplay];

    return(
        <>
            <section className="MainSection1" ref={sectionRef}>
                <div className="MainHeader">
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
                    slidesPerView={2.5} // 한번에 보여지는 slide 개수
                    spaceBetween={14} // slide간의 간격
                    loopedSlides={2}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{ // 반응형 구현
                        1200: {
                            slidesPerView: 4.5,
                            spaceBetween: 40,
                        }, // width 값이 1200이 넘을때 실행
                    }}
                    modules={modules}
                    className={'mySwiper sec2-swiper'}
                >
                    <SwiperSlide>
                        <div className="img-box">
                            <img src="/img/room/study room1-1.png" alt="room1" />
                        </div>
                        <div className="txt-box">
                            <dl>
                                <dt>룸1</dt>
                                <dd>룸설명1</dd>
                            </dl>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="img-box">
                            <img src="/img/room/study room1-1.png" alt="room1" />
                        </div>
                        <div className="txt-box">
                            <dl>
                                <dt>룸2</dt>
                                <dd>룸설명2</dd>
                            </dl>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="img-box">
                            <img src="/img/room/study room1-1.png" alt="room1" />
                        </div>
                        <div className="txt-box">
                            <dl>
                                <dt>룸3</dt>
                                <dd>룸설명3</dd>
                            </dl>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="img-box">
                            <img src="/img/room/study room1-1.png" alt="room1" />
                        </div>
                        <div className="txt-box">
                            <dl>
                                <dt>룸4</dt>
                                <dd>룸설명4</dd>
                            </dl>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="img-box">
                            <img src="/img/room/study room1-1.png" alt="room1" />
                        </div>
                        <div className="txt-box">
                            <dl>
                                <dt>룸5</dt>
                                <dd>룸설명5</dd>
                            </dl>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
        </>
    )
}

export default Main;