import React, { useEffect, useState } from "react";
import '../../../style/Mypage.css';
import { Link } from "react-router-dom";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
// import { nanoid } from nanoid;

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "EIZMkdSmXud7BAXITGXJM";
const { nanoid } = require('nanoid');
const MoneyModal = ({ open, onClose, amount, Name, widget }) => {
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);


    // const { nanoid } = require('nanoid');


    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        if (!open) return; // open이 false면 실행하지 않음
        const fetchPaymentWidgets = async () => {
            try {
                // ------  결제위젯 초기화 ------
                const tossPayments = await loadTossPayments(clientKey);
                // 회원 결제
                const widgets = tossPayments.widgets({
                    customerKey,
                });
                // 비회원 결제
                // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
                setWidgets(widgets);
            } catch (error) {
                console.error("Error loading Toss Payments widgets:", error);
            }
        };
        fetchPaymentWidgets();
    }, [clientKey, customerKey, open]);

    useEffect(() => {
        if (!widgets || !open) return; // open과 widgets가 준비되지 않았으면 실행하지 않음
        const renderPaymentWidgets = async () => {
            setTimeout(async () => {
                // ------ 주문의 결제 금액 설정 ------
                await widgets.setAmount({
                    currency: "KRW",
                    value: Number(amount)
                });
                try {
                    await Promise.all([
                        // ------ 결제 UI 렌더링 ------
                        widgets.renderPaymentMethods({
                            selector: "#payment-method",
                            variantKey: "DEFAULT",
                        }),
                        // ------ 이용약관 UI 렌더링 ------
                        widgets.renderAgreement({
                            selector: "#agreement",
                            variantKey: "AGREEMENT",
                        }),
                    ]);
                    setReady(true);
                } catch (error) {
                    console.error("Error rendering payment widgets:", error);
                }
            }, 100);
        };
        renderPaymentWidgets();
    }, [widgets, open, amount]);

    if (!open) return null; // open이 false면 컴포넌트 자체를 렌더링하지 않음

    return (
        <div className="custom-modal-overlay" onClick={handleOverlayClick}>
            <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
                <div className="Modal-container">
                    <div className="Payment1">
                        <img src="/img/icon/creditArrow.png" alt="이전" style={{ width: "40px", height: "40px" }} onClick={onClose} />
                        <Link to='/'>
                            <img src="/img/icon/home.png" alt="홈" style={{ width: "30px", height: "30px", marginLeft: "15px" }} />
                        </Link>
                        <span className="Payment">결제방법</span>
                        <img src="/img/icon/close.png" alt="닫기" style={{ width: "30px", height: "30px", marginLeft: "30px" }} onClick={onClose} />
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
                        {/* 결제 UI */}
                        <div id="payment-method" />
                        {/* 이용약관 UI */}
                        <div id="agreement" />
                    </div>
                    <div className="Modal-content">
                        <button
                            disabled={!ready}
                            onClick={async () => {
                                try {
                                    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                                    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                                    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                                    await widgets.requestPayment({
                                        orderId: nanoid(),
                                        orderName: "시간",
                                        successUrl: `${window.location.origin}/success?Name=${encodeURIComponent(Name)}&amount=${encodeURIComponent(amount)}&OrderType=individualOrder&MemberId=${encodeURIComponent(sessionStorage.getItem("id"))}`,
                                        failUrl: `${window.location.origin}/fail?Name=${encodeURIComponent(Name)}&amount=${encodeURIComponent(amount)}`,

                                        // customerEmail: "taerangkim0116@gmail.com",
                                        customerName: `${sessionStorage.getItem("name")}`,
                                        customerMobilePhone: "01092783810",
                                    });
                                } catch (error) {
                                    // 에러 처리하기
                                    console.error(error);
                                }
                            }}
                        >결제하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoneyModal;
