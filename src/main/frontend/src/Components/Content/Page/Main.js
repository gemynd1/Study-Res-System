import React from "react";
import "../../../style/Main.css"

const Main = () => {
    return(
        <>
            <section className="MainSection">
                <div className="MainHeader">
                    <span>SN 스터디카페 입니다</span><br />
                    <span>연성대학교 학생들을 위한 스터디카페 입니다.</span>
                </div>
                <div className="MainContent">
                    <div>
                        <ul className="MainContent-title">
                            <li>월 평균 사용자</li>
                            <li>누적 사용자</li>
                            <li>사용 만족도</li>
                        </ul>
                        <ul className="MainContent-content">
                            <li>5,000명</li>
                            <li>100,000명</li>
                            <li>100%</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Main;