import React, { useEffect, useState } from "react";
import '../../../style/Mypage.css';
import { Link } from "react-router-dom";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import axios from "axios";
// import { nanoid } from nanoid;

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "ll-yw-PKw-5_SU3JBZJvL";
const { nanoid } = require('nanoid');
const MoneyModal = ({ open, onClose, amount, Name, widget, TicketSelect, Name2 }) => {
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [random, setRandom] = useState(null);
    const [total, setTotal] = useState(amount); // 가격
    const [sipname, setSipname] = useState(Name2); // 시간

    useEffect(() => {
        const today = new Date();
        const formatdate = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
        const randomNum = Math.floor(Math.random() * 1000000)
        setRandom(`${formatdate}${randomNum}`);
    }, [])

    const increaseQuantity = (input) => {
        if(quantity < input) {
            setQuantity(quantity + 1);
            setSipname(Name2.includes('주') || Name2.includes('년') ? Name2 : Name2 * (quantity + 1));
            setTotal((quantity + 1) * amount);
        }
    };
    
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setSipname(Name2.includes('주') || Name2.includes('년') ? Name2 : Name2 * (quantity - 1));
            setTotal((quantity - 1) * amount);
        }
    };

    useEffect(() => {console.log(sipname, total)}, [sipname, total])

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
            setQuantity(1);
        }
    };

    useEffect(() => {
        if(!open) return;// open이 false면 실행하지 않음
        if (open) {
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
        }
    }, [clientKey, customerKey, open]);

    useEffect(() => {
        const renderPaymentWidgets = async () => {
            if (!widgets || !open) return; // open과 widgets가 준비되지 않았으면 실행하지 않음
            setTimeout(async () => {
                // ------ 주문의 결제 금액 설정 ------
                await widgets.setAmount({
                    currency: "KRW",
                    value: quantity === 1 ? Number(amount) : Number(total)
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
                        <span className="PaymentText">수량선택</span>
                        {/* <span> */}
                        <span className="paymentQuantity-container">
                            {TicketSelect === "당일권" ? (
                                <>
                                    <button className="paymentQuantitybtn" onClick={decreaseQuantity}>-</button>
                                    <span className="paymentQuantityspan">{quantity}</span>
                                    <button className="paymentQuantitybtn" onClick={() => increaseQuantity(10)}>+</button>
                                </>
                            ) : (
                                <span className="paymentQuantityspan">{quantity}</span>
                            )}
                        </span>
                            
                        {/* </span> */}
                    </div>
                    <div className="AllCredit">
                        <span className="PaymentText">최종 결제 금액</span>
                        <span className="PaymentText1"> 
                            총 
                            {Name2.includes("주") || Name2.includes("년") ? Name2 : Name2 * quantity} 
                            {Name2.includes("주") || Name2.includes("년") ? "" : "시간"} / {quantity === 1 ? amount : total}원</span>
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
                                    
                                    // 먼저 get으로 해당 name 을 넘겨서 숫자만 뽑아온다. 정규화
                                    
                                    const requestData = [
                                        {
                                            random : random,
                                            sipname : sipname,
                                            memberId : sessionStorage.getItem("id"),
                                            OrderType : "InviOrder"
                                        }
                                    ]
                                    axios.post(`http://localhost:8099/api/templateOrder?random=${encodeURIComponent(String(random))}&requestData=${encodeURIComponent(JSON.stringify(requestData))}`,
                                        {
                                            headers : { 'Content-Type': 'application/json' }
                                        }
                                    ).then(res=> {
                                        widgets.requestPayment({
                                            orderId: nanoid(),
                                            orderName: "시간",
                                            successUrl: window.location.origin + `/paysuccess?ordernum=${random}&ordertype=inviorder`,
                                            failUrl: window.location.origin + `/fail`,
                                            // customerEmail: "taerangkim0116@gmail.com",
                                            customerName: `${sessionStorage.getItem("name")}`,
                                            customerMobilePhone: "01092783810",
                                        });
                                    })
                                    
                                } catch (error) {
                                    if(error.code === 500) {
                                        alert("결제 창이 닫혔습니다. 결제를 다시 시도해주세요.")
                                        window.location.reload();
                                    } else {
                                        // 에러 처리하기
                                        console.error(error);
                                    }
                                    
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
