import React from "react";
import "../../style/layout.css";
// import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <ul className="footer-section-1">
                    <li><img src="/img/snlogo.png" alt="logo" className="logo"/></li>
                    <li>
                        <div>SN스터디</div>
                        <div>경기도 안양시 만안구 양화로37번길 34</div>
                    </li>
                    <li>
                        <div>팀원</div>
                        <div>김태랑 백지민 정희수 김지민</div>
                    </li>
                    <li>
                        <div>Email</div>
                        <div>muse7244@yeonsung.ac.kr</div>
                    </li>
                    <li>Copyright 2024 SN STUDY inc. Allright Reserved.</li>
                </ul>
                <ul className="footer-section-2">
                    <li>회사명: SN</li>
                    <li>대표: SN</li>
                    <li>사업자등록번호: SN</li>
                </ul>
            </footer>
        </>
    )
}

export default Footer;