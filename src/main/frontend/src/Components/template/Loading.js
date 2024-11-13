import React from "react";
import { useNavigate,useSearchParams, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import '../../style/Pay.css'; // 별도 스타일 파일

const Loading = () => {
    const handleReturnHome = () => {
        navigate('/');
    };
    const navigate = useNavigate();
    return (
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
                        <p><span className="order-details-title">예약번호 :</span> 20241108646630</p>
                        <hr />
                        <p><span className="order-details-title">예약일시 :</span> 2024-11-20</p>
                        <hr />
                        <p><span className="order-details-title">예약내역 :</span> 달방 2024-11-20 (15:00 ~ 16:00) (2명)</p>
                        <hr />
                        <p><span className="order-details-title">결제방법 :</span> 토스페이</p>
                        <hr />
                        <p><span className="order-details-title">결제금액 :</span> 10000원</p>
                    </div>
                </div>
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
        // <div style={{ 
        //     display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        //     width: '100%', margin: 'auto', paddingTop: '300px', paddingBottom: '300px'
        // }}>
        //     <img src='/img/icon/spinner.gif' alt='loading' />
        //     <p>결제를 처리 중입니다. 잠시만 기다려 주세요...</p>
        //     {/* 로딩 스피너를 추가하고 싶다면 아래와 같이 표시할 수 있습니다 */}
        // </div>
    )
}
export default Loading