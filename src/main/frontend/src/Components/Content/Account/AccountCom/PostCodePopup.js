import React, {useState} from "react";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";

const PopupStyle = {
    background : 'rgba(0,0,0,0.25)',
    position : 'fixed',
    border : '1px solid #000',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height:'50%',
    width:'30%',
}

const PopupCloseStyle = {
    background : 'white',
    position : 'fixed',
    border : '1px solid #000',
    top: '77%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height:'4.5%',
    width:'30.1%',
    // zIndex: 100,
}

// 우편번호 API
const PostCodePopup = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const KAKAO_KEY = process.env.REACT_APP_KAKAO_KEY;
    const complete = (data) =>{
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
            params : {
                query: fullAddress
            },
            headers : {
                Authorization: `KakaoAK ${KAKAO_KEY}`,
                'KA': 'sdk/1.43.5 os/javascript lang/ko-KR origin/http://localhost:3000 device/desktop'
            }
        })
        .then(response => {
            if(response.data.documents.length > 0){
                const location = response.data.documents[0].address;
                const x = location.x;
                const y = location.y;

                console.log('위도', y);
                console.log('경도', x);

                props.setcompany({
                    ...props.company,
                    address:fullAddress,
                    zonecode:data.zonecode,
                    latitude: y,
                    longitude: x,
                });
            } else {
                console.error('주소를 찾을 수 없습니다.');
            }
        })
        .catch(error => {
            if (error.response) {
                // 서버가 2xx 범위 외의 상태 코드로 응답한 경우
                console.error('서버 응답 오류:', error.response.data);
                console.error('응답 상태 코드:', error.response.status);
                console.error('응답 헤더:', error.response.headers);
            } else if (error.request) {
                // 요청이 만들어졌지만 응답을 받지 못한 경우
                console.error('요청 오류:', error.request);
            } else {
                // 요청을 설정하는 동안에 오류가 발생한 경우
                console.error('설정 오류:', error.message);
            }
            console.error('전체 오류 객체:', error.config);
        })
        
        setIsOpen(false)
    }

    return (
        <div>
            {isOpen && 
                <div key="postcode-popup">
                    <button title="닫기" 
                        onClick={() => setIsOpen(false)} 
                        style={PopupCloseStyle}
                    >
                        닫기
                    </button>
                    <DaumPostcode
                        style={PopupStyle}
                        onComplete={complete}
                    />
                    
                </div>
            }
        </div>
    );
};

export default PostCodePopup;