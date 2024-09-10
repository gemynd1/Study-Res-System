import React from "react";
import "../../style/layout.css";
// import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <ul className="footer-section-1">
                    <li><img src="/img/snlogo(white).png" alt="logo" className="logo"/></li>
                    <li className="footer-address">
                        <div className="footer-address-1">SN스터디</div>
                        <div className="footer-address-2">경기도 안양시 만안구 양화로37번길 34</div>
                    </li>
                    <li className="footer-team">
                        <div className="footer-team-1">팀원</div>
                        <div className="footer-team-2">김태랑 백지민 정희수 김지민</div>
                    </li>
                    <li className="footer-email">
                        <div className="footer-email-1">Email</div>
                        <div className="footer-email-2">muse7244@yeonsung.ac.kr</div>
                    </li>
                    <li className="footer-copyright">Copyright 2024 SN STUDY inc. Allright Reserved.</li>
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