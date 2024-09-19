import React from "react";
import {useNavigate} from "react-router-dom";
import '../../../style/Mypage.css';

const MemberDelete = ({ open, onClose }) => {
    if (!open) return null;

    // const navigate = useNavigate();
    //
    // const navigateBtn = () => {
    //     navigate('/');
    // }

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
                        <button>회원탈퇴</button>
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

export default MemberDelete;