import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../../../style/Mypage.css';
import axios from "axios";

const MemberDeleteModal = ({ open, onClose }) => {
    const navigate = useNavigate();
    const [id, setId] = useState(sessionStorage.getItem("id"));

    if (!open) return null;

    const handleDelete = async (e) => {
        e.preventDefault();

        const memberId = sessionStorage.getItem("id"); // 세션에서 회원 ID 가져오기

        if (!memberId) {
            alert("로그인이 필요합니다.");
            return;
        }

        const confirmation = window.confirm("정말로 탈퇴하시겠습니까?");
        if (!confirmation) return;

        try {
            // axios로 탈퇴 요청 보내기
            const response = await axios.post("http://localhost:8099/api/mypage/mypageExit",{
                memberId: memberId, // 요청 본문에 memberId 추가
            },
                {header: {'Content-Type': 'application/json'}}
            );

            // 성공적인 응답 처리
            if (response.status === 200) {
                alert(response.data); // 서버에서 반환된 메시지 출력
                sessionStorage.clear(); // 세션 스토리지 초기화
                window.location.href = "/"; // 메인 페이지로 리다이렉트
            } else {
                alert("탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            // 예외 처리
            console.error(error);
            alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }
    };


    const navigateBtn = () => {
        alert('탈퇴되었습니다.')
        navigate('/');
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className="deletemodal" onClick={handleOverlayClick}>
            <div className="deletemodal-content">
                <div className="MemberBox1">
                    <div className="MemberBox">
                        <img src="/img/icon/memberOut.png" alt="회월탈퇴"
                             style={{width: "60px", height: "60px"}}/>
                    </div>
                </div>
                <div className="MemberBox2">
                    <span>정말 탈퇴하시겠어요?</span>
                </div>
                <div className="MemberDelete">
                    <div className="MemberBox3">
                        <span>회원탈퇴 버튼 선택시, 계정은 삭제되며 복구되지 않습니다.</span>
                    </div>
                </div>
                <div className="DeleteBtn">
                    <div className="DeleteBtn1">
                        <button onClick={handleDelete}>회원탈퇴</button>
                    </div>
                </div>
                <div className="cancleBtn">
                    <div className="DeleteBtn2">
                        <button onClick={onClose}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDeleteModal;