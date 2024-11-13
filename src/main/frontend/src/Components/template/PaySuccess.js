import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate,useSearchParams, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import '../../style/Pay.css'; // 별도 스타일 파일
import axios from 'axios';

const PaySuccess = () => {
    // e.preventDefault();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const orderType = searchParams.get('ordertype');
    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState([]);
    const [paydata, setPaydata] = useState('');
    // 결제 성공 시 들어갈 내역 테이블(결제내역)
    const [orderPayData, setOrderPayData] = useState({
        SGONum : '',
        TSOPIdx : '',
        TSOPMethod : '',
        TSOPPrice : '',
        TSOPStatus : '',
        TSOPDivi : '',
    }) 
    // 결제 성공 후 예약 내용 들어갈 테이블(그룹)
    const [orderWaitData, setOrderWaitData] = useState({
        SGONum : '',
        SGIIdx : '',
        TSOPIdx : '',
        SGORegDate : '',
        SGOStartDate : '',
        SGOEndDate : '',
        SGOtotal : '',
        SGOPeople : ''
    }) 
    // 결제 성공 후 예약 내용 들어갈 테이블(개인)
    const [orderWaitinData, setOrderWaitinData] = useState('');

    const [orderNotification, setOrderNotification] = useState('');
    const [orderState, setOrderState] = useState(false);
    const ordernum = searchParams.get('ordernum');
    const orderid = searchParams.get('orderId')
    // 임시 저장한 데이터 저장할 useState
    const [orderContent, setOrderContent] = useState("");
    const navigate = useNavigate();

    const invidate = new Date();
    const formattedDate = `${invidate.getFullYear()}-${String(invidate.getMonth() + 1).padStart(2, '0')}-${String(invidate.getDate()).padStart(2, '0')}`;

    useEffect(() => {
        // 임시 저장한 데이터 가져옴, 가져온 데이터는 Y처리
        axios.get('http://localhost:8099/api/templateOrderInfo', 
            {
                params : { orderid },
                headers : { 'Content-Type': 'application/json' }
            }).then((res) => {
                setOrderContent(res.data);
            }).catch((error) => {
                console.error('error', error);
            });

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
                setPaydata(responseData);
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
                    // 결제 승인 후 결제내역(그룹)
                    if(orderType === 'grouporder') {
                        if(data.method === "간편결제") {
                            setOrderPayData((prevState) => ({
                                ...prevState,
                                TSOPIdx : data.orderId,
                                TSOPMethod : `${data.method}_${data.easyPay.provider}`,
                                TSOPPrice : data.totalAmount,
                                TSOPStatus : 'Y',
                            }))
                        } else if(data.method === "카드") {
                            setOrderPayData((prevState) => ({
                                ...prevState,
                                TSOPIdx : data.orderId,
                                TSOPMethod : `${data.method}_${data.card.cardType}(${data.card.ownerType})`,
                                TSOPPrice : data.totalAmount,
                                TSOPStatus : 'Y',
                            }))
                        }
                        // 최종 결제 후 order data
                        setOrderWaitData((prevState) => ({
                            ...prevState,
                            SGONum : searchParams.get('ordernum'),
                            TSOPIdx : data.orderId,
                            SGOtotal : data.totalAmount,
                        }))
                        setOrderNotification(`스터디룸 ${data.orderName} 이 예약되었습니다.`);
                    // 결제 승인 후 결제내역(개인좌석)
                    } else if(orderType === 'inviorder') {
                        if(data.method === "간편결제") {
                            setOrderPayData((prevState) => ({
                                ...prevState,
                                TSOPIdx : data.orderId,
                                TSOPMethod : `${data.method}_${data.easyPay.provider}`,
                                TSOPPrice : data.totalAmount,
                                TSOPStatus : 'Y',
                            }))
                        } else if(data.method === "카드") {
                            setOrderPayData((prevState) => ({
                                ...prevState,
                                TSOPIdx : data.orderId,
                                TSOPMethod : `${data.method}_${data.card.cardType}(${data.card.ownerType})`,
                                TSOPPrice : data.totalAmount,
                                TSOPStatus : 'Y',
                            }))
                        }
                    }
                    setOrderState(true);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('결제 승인 실패:', error);
            });
    }, [searchParams]);

    useEffect(() => {
        const startdate = `${orderContent[0]?.date} ${orderContent[0]?.start}:00`;
        const enddate = `${orderContent[0]?.date} ${orderContent[0]?.end}:00`;
        const date = new Date(orderContent[0]?.date);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        
        if(orderType === 'grouporder') {
            setOrderPayData((prevState) => ({
                ...prevState,
                TSOPDivi : orderContent[0]?.OrderType
            }))
            setOrderWaitData((prevState) => ({
                ...prevState,
                SGIIdx : orderContent[0]?.roomnum,
                SGORegDate: formattedDate,
                SGOStartDate : startdate,
                SGOEndDate : enddate,
                SGOpeople : orderContent[0]?.people,
            }))
        } else if(orderType === 'inviorder') {
            setOrderPayData((prevState) => ({
                ...prevState,
                TSOPDivi : orderContent[0]?.OrderType
            }))
            setOrderWaitinData(orderContent[0]?.sipname);
            console.log(orderContent[0]?.sipname);
            setOrderNotification(
                orderContent[0]?.sipname && typeof orderContent[0].sipname === 'string'
                    ? orderContent[0]?.sipname.includes('년')
                        ? `${orderContent[0]?.sipname}이 충전되었습니다.` 
                        : orderContent[0]?.sipname.includes('주') 
                            ? `${orderContent[0]?.sipname} 정기권이 충전되었습니다.` 
                            : `${orderContent[0]?.sipname} 시간이 충전되었습니다.`
                    : `${orderContent[0]?.sipname} 시간이 충전되었습니다.`  
            );
        }
        
    }, [orderContent])

    useEffect(() => {
        if(orderState) {
            console.log(orderPayData);
            console.log(orderWaitData);
            console.log(orderWaitinData);
            axios.post('http://localhost:8099/api/OrderPay', null,
                {
                    params : {
                        orderPayData : JSON.stringify(orderPayData),
                        MemberId : sessionStorage.getItem("id"),  
                    },
                    headers:{'Content-Type': 'application/json'}  
                },
            ).then((res1) => {
                if(orderType === 'grouporder') {
                    console.log('첫번째 완', res1.data)
                    Promise.all([
                        axios.post('http://localhost:8099/api/OrderWait', null, 
                            {
                                params : {
                                    orderWaitData : JSON.stringify(orderWaitData),
                                    MemberId : sessionStorage.getItem("id"),  
                                },
                            }
                        ),
                        axios.post('http://localhost:8099/api/OrderNotification', null,
                            {
                                params : {
                                    MaContent : orderNotification,
                                    MemberId : sessionStorage.getItem("id"),  
                                },
                            }
                        )
                    ],{headers:{'Content-Type': 'application/json'}})
                    .then(
                        axios.spread((res2, res3) => {
                            console.log('두번째 완', res2.data)
                            console.log('세번째 완', res3.data)
                            
                            alert("결제가 성공적으로 완료되었습니다.");
                            setOrderState(false);
                            setResponseData(null);
                        })
                    )
                    .catch((error) => {
                        console.error('요청실패', error)
                    })
                } else if(orderType === 'inviorder'){
                    console.log('첫번째 완', res1.data)
                    Promise.all([
                        axios.post('http://localhost:8099/api/OrderWaitIn', null,
                            {
                                params : {
                                    orderWaitinData : orderWaitinData,
                                    MemberId : sessionStorage.getItem("id"),  
                                },
                            },
                        ),
                        axios.post('http://localhost:8099/api/OrderNotification', null,
                            {
                                params : {
                                    MaContent : orderNotification,
                                    MemberId : sessionStorage.getItem("id"),  
                                },
                            }
                        )
                    ], {headers:{'Content-Type': 'application/json'}})
                    .then(
                        axios.spread((res2,res3) => {
                            console.log('두번째 완', res2.data)
                            console.log('세번째 완', res3.data)
            
                            alert("결제가 성공적으로 완료되었습니다.");
                            setOrderState(false);
                            setResponseData(null);
                        })
                    )
                    .catch((error) => {
                        console.error('요청실패', error)
                    })
                }
            }).catch((error) => {
                console.error('요청실패', error)
            })
        }
    },[orderState, orderPayData, orderWaitData])
    // 홈으로 돌아가는 함수
    const handleReturnHome = () => {
        navigate('/');
    };

    const handleReturnBack = () => {
        navigate(-1);
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
                    <h2 className="confirmation-title">결제가 완료 되었습니다</h2>
                    <div className='order-title'>
                        <h4>주문 정보</h4>
                    </div>

                    <div className="order-complete-box">
                        <div className="order-details">
                            <div>
                                <p><span className="order-details-title">예약번호 :</span> {searchParams.get('ordernum')}</p>
                                <hr />
                                <p>
                                    <span className="order-details-title">예약일시 :</span> {orderType === 'grouporder' ? orderContent[0]?.date : formattedDate}
                                    {/* {orderContent[0]?.date} */}
                                </p>
                                <hr />
                                <p><span className="order-details-title">예약내역 :</span> {paydata.orderName}</p>
                                <hr />
                                <p><span className="order-details-title">결제방법 :</span> {orderPayData.TSOPMethod}</p>
                                <hr />
                                <p><span className="order-details-title">결제금액 :</span> {orderPayData.TSOPPrice}원</p>
                            </div>
                        </div>
                    </div>
                    {/* 스터디룸 예약인지 개인시간인지*/}
                    <p className="confirmation-text">
                        저희 SN스터디를 이용해주셔서 감사합니다 <br />
                        구매하신 이용권은 예약날짜에 맞춰 이용하실 수 있습니다.
                    </p>
                    {/* 홈으로 돌아가기 버튼 */}
                    <div className="confirmation-buttons">
                        <Button style={{ margin: '10px' }} variant="contained" color="secondary" onClick={handleReturnBack}>
                            이전페이지
                        </Button>
                        <Button style={{ margin: '10px' }} variant="contained" color="primary" onClick={handleReturnHome}>
                            홈으로가기
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PaySuccess;
