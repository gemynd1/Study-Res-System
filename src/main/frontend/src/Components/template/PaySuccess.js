import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate,useSearchParams, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import '../../style/Pay.css'; // 별도 스타일 파일
import axios from 'axios';

const PaySuccess = () => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState([]);
    const [orderPayData, setOrderPayData] = useState({
        TSOPIdx : '',
        TSOPMethod : '',
        TSOPPrice : '',
        TSOPStatus : '',
        TSOPDivi : '',
    }) // 결제 성공 시 들어갈 내역 테이블
    const [orderWaitData, setOrderWaitData] = useState({
        SGONum : '',
        SGIdx : '',
        TSGOPIdx : '',
        SGOStartDate : '',
        SGOEndDate : '',
        SGOtotal : '',
    }) // 결제 성공 후 예약 내용 들어갈 테이블
    const [orderState, setOrderState] = useState(false);
    const [orderRandom, setOrderRandom] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const requestData = {
            orderId : searchParams.get('orderId'),
            paymentKey : searchParams.get('paymentKey'),
            amount : searchParams.get('amount'),
        }

        const approvePayment = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8099/api/approve-payment', 
                    requestData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const responseData = response.data;
                if (responseData.error) {
                    throw new Error(responseData.error);
                }
                console.log('결제 승인 성공:', response.data);
                return responseData;
            } catch (error) {
                console.error('결제 승인 실패:', error);
                alert("결제 실패하였습니다.");
                navigate('/payfail');
                return null;
            }
        };
        
        approvePayment()
            .then((data) => {
                if(data) {
                    setResponseData((prevState) => ({
                        ...prevState,
                        ...data
                    }));
                    setOrderPayData((prevState) => ({
                        ...prevState,
                        TSOPIdx : data.orderId,
                        MemberId : sessionStorage.getItem("id"),
                        TSOPMethod : `${data.method}_${data.easyPay.provider}`,
                        TSOPPrice : data.totalAmount,
                        TSOPStatus : 'Y',
                        TSOPDivi : searchParams.get('ordertype'),
                    }))
                    setOrderWaitData((prevState) => ({
                        ...prevState,
                        SGONum : Number(searchParams.get('sgonum')),
                        SGIdx : searchParams.get('roomnum'),
                        MemberId : sessionStorage.getItem("id"),
                        TSGOPIdx : data.orderId,
                        SGOStartDate : searchParams.get('start'),
                        SGOEndDate : searchParams.get('end'),
                        SGOPeople : searchParams.get('people'),
                        SGOtotal : data.totalAmount,
                    }))
                    setOrderState(true);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('결제 승인 실패:', error);
            });
    }, [searchParams]);

    useEffect(() => {
        if(orderState) {
            console.log("1" ,orderPayData)
            console.log("2" ,orderWaitData)

            // alert("결제가 성공적으로 완료되었습니다.");
            // setOrderState(false);
            // setResponseData(null);
            // 백엔드 저장
            Promise.all([
                axios.post('http://localhost:8099/api/OrderPay', orderPayData),
                axios.post('http://localhost:8099/api/OrderWait', orderWaitData),
            ])
            .then(([res1, res2]) => {
                console.log('첫번째 완', res1.data)
                console.log('두번째 완', res2.data)

                alert("결제가 성공적으로 완료되었습니다.");
                setOrderState(false);
                setResponseData(null);
            })
            .catch((error) => {
                console.error('요청실패', error)
            })
        }
    },[orderState])
    
        
            // 백엔드 저장
            // axios.post("http://localhost:8099/api/orderPay")
            // console.log("업데이트된 결제 데이터:", responseData);
            // console.log("업데이트된 결제 데이터ㅇㅇ:", paymentData);
    // 홈으로 돌아가는 함수
    const handleReturnHome = () => {
        navigate('/');
    };

    return (
        <>
            {loading || orderState ? (
                <div style={{ 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                    width: '100%', margin: 'auto', paddingTop: '300px', paddingBottom: '300px'
                }}>
                    <img src='/img/icon/spinner.gif' alt='loading' />
                    <p>결제를 처리 중입니다. 잠시만 기다려 주세요...</p>
                </div>
            ) : (
                <div className="confirmation-container">
                    {/* 결제 완료 아이콘 */}
                    <div className="confirmation-icon">
                        <CheckCircleIcon style={{ fontSize: '4rem', color: '#4CAF50' }} />
                    </div>
                    {/* 결제 성공 메시지 */}
                    <h2 className="confirmation-title">결제가 완료 되었습니다</h2>
                    {/* 주문 세부 사항 */}
                    <div className='order-title'>
                        <h4>주문 정보</h4>
                    </div>
                    <div className="order-details">
                        
                        <table border={1}>
                            <tr>
                                {/* 스터디룸인지 개인시간인지 */}
                                <td>예약 내역</td>
                                <td>결제 방법</td>
                                <td>결제 번호</td>
                                <td>예약날짜</td>
                                <td>결제 금액</td>
                            </tr>
                            <tr>
                                {/* <td>{paymentData.orderName}</td>
                                <td>{paymentData.method}</td>
                                <td>{paymentData.orderId}</td>
                                <td>{paymentData.card}</td>
                                <td>{paymentData.amount}</td> */}
                            </tr>
                        </table>
                    </div>
                    {/* 스터디룸 예약인지 개인시간인지*/}
                    <p className="confirmation-text">
                        저희 스터디룸을 이용해주셔서 감사합니다 <br />
                        구매하신 이용권은 예약날짜에 맞춰 이용하실 수 있습니다.
                    </p>
                    {/* 홈으로 돌아가기 버튼 */}
                    <div>
                        <Button variant="contained" color="primary" onClick={handleReturnHome}>
                            홈으로가기
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PaySuccess;
