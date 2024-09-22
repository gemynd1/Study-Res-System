import React, {useState} from "react";
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

        props.setcompany({
            ...props.company,
            address:fullAddress,
            zonecode:data.zonecode,
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