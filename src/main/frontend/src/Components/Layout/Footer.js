import React from "react";
import "../../style/footer.css";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-section-1">
                    <img src="/img/snlogo(white).png" alt="logo" className="logo"/>
                    <div className="footer-text">
                        <div className="footer-address">
                            <div className="footer-address-1">SN스터디</div>
                            <div className="footer-address-2">경기도 안양시 만안구 양화로37번길 34</div>
                        </div>
                        <div className="footer-team">
                            <div className="footer-team-1">팀원</div>
                            <div className="footer-team-2">김태랑 백지민 정희수 김지민</div>
                        </div>
                        <div className="footer-email">
                            <div className="footer-email-1">Email</div>
                            <div className="footer-email-2">muse7244@yeonsung.ac.kr</div>
                        </div>
                        <div className="footer-copyright">Copyright 2024 SN STUDY inc. Allright Reserved.</div>
                    </div>
                </div>
                <div className="footer-section-2">
                    <Link to="고객센터(문의하기)">
                        <img src="/img/icon/message(white).png" alt="message" className="footer-message"/>
                    </Link>
                    <Link to="고객센터">
                        <img src="/img/icon/call(white).png" alt="call" className="footer-call"/>
                    </Link>
                    <Link to="https://github.com/breath03/SnakeDev">
                        <img src="/img/icon/github(white).png" alt="github" className="footer-github"/>
                    </Link>
                </div>
            </footer>
        </>
    )
}

export default Footer;