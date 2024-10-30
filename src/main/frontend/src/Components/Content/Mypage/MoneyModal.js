import React, {useState} from "react";
import '../../../style/Mypage.css';
import {Link} from "react-router-dom";

const MoneyModal = ({ open, onClose, amount, Name }) => {

    if (!open) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="custom-modal-overlay" onClick={handleOverlayClick}>
            <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
                <div className="Modal-container">
                    <div className="Payment1">
                        <img src="/img/icon/creditArrow.png" alt="이전" style={{width : "40px", height: "40px"}} onClick={onClose} />
                        <Link to='/'>
                            <img src="/img/icon/home.png" alt="홈" style={{width: "30px", height: "30px", marginLeft: "15px"}} />
                        </Link>
                        <span className="Payment">결제방법</span>
                        <img src="/img/icon/close.png" alt="닫기" style={{width: "30px", height: "30px", marginLeft: "30px"}} onClick={onClose}/>
                    </div>
                    <div className="AllCredit">
                        <span className="PaymentText">상품명</span>
                        <span className="PaymentText1">{Name}</span>
                    </div>
                    <div className="AllCredit">
                    <span className="PaymentText">최종 결제 금액</span>
                        <span className="PaymentText1">{amount}원</span>
                    </div>
                    <div className="AllCredit">
                        <span className="PaymentText">결제수단 선택</span>
                    </div>
                    <div className="PaymentAllBox">
                        <div className="PaymentBox">
                            카카오 결제
                        </div>
                        <div className="PaymentBox">
                            신용카드 결제
                        </div>
                    </div>
                    <div className="Modal-content">
                        <button>결제하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoneyModal;
