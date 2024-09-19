import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import '../../../style/Mypage.css';

const CustomerService = () => {

    const [helpBox, setHelpBox] = useState(false);
    const [helpBox2, setHelpBox2] = useState(false);
    const [helpBox3, setHelpBox3] = useState(false);
    const [helpBox4, setHelpBox4] = useState(false);
    const [helpBox5, setHelpBox5] = useState(false);
    const [helpBox6, setHelpBox6] = useState(false);


    // const handleClick = () => {
    //     setHelpBox(!helpBox);
    //     setHelpBox2(false);
    //     setHelpBox3(false);
    //     setHelpBox4(false);
    //     setHelpBox5(false);
    //     setHelpBox6(false);
    // };

    const handleClick = (boxIndex) => {
        setHelpBox(boxIndex === 1);
        setHelpBox2(boxIndex === 2);
        setHelpBox3(boxIndex === 3);
        setHelpBox4(boxIndex === 4);
        setHelpBox5(boxIndex === 5);
        setHelpBox6(boxIndex === 6);
    };

    const handleClick2 = () => {
        setHelpBox(false);
        setHelpBox2(!helpBox2);
        setHelpBox3(false);
        setHelpBox4(false);
        setHelpBox5(false);
        setHelpBox6(false);
    };

    const handleClick3 = () => {
        setHelpBox(false);
        setHelpBox2(false);
        setHelpBox3(!helpBox3);
        setHelpBox4(false);
        setHelpBox5(false);
        setHelpBox6(false);
    };

    const helpBoxRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (helpBoxRef.current && !helpBoxRef.current.contains(event.target)) {
                setHelpBox(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleClose = () => {
        setHelpBox(false);
    }


    return (
        <div className="MyPage">
            <div className="Mypageheader">
                <div className="MypageHome">
                    <Link to='/'>
                        <img src="/img/icon/home.png" alt='/' className="icon"/>
                    </Link>
                </div>
                <div className="Mypageheader2">
                    <div className="MypageheaderLine">
                        <Link to='/CustomerService' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">고객센터</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
                <div className="CustomerServiceIcon">
                    <div className="CustomerService">
                        <Link to='/CustomerService' style={{ textDecoration: "none", display: "contents"}}>
                            <span>문의하기</span>
                            <img src='/img/icon/customerWrite.png' alt="문의하기" style={{width: "30px", height: "30px"}}/>
                        </Link>
                        <Link to='/' style={{ textDecoration: "none", display: "contents"}}>
                            <span>문의내역</span>
                            <img src='/img/icon/customerHistory.png' alt="문의하기" style={{width: "30px", height: "30px"}}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="CustomerBody">
                <div className="CustomerBanner">
                    <span className="CustomerBodyText">SN스터디 고객센터</span>
                </div>
                <div className="helpText">
                    <span>자주 찾는 도움말</span>
                </div>
                <div className="CustomerBox">
                    <button onClick={() => handleClick(1)} className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 결제 문의 안내</span>
                        </div>
                    </button>

                    <button onClick={() => handleClick(2)} className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 개인 좌석 이용방법</span>
                        </div>
                    </button>
                    <button className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 룸 대여 이용방법</span>
                        </div>
                    </button>
                </div>
                {helpBox && (
                    <div className="newDiv">
                        <span>결제와 관련된 문의사항은 고객센터로 연락 주시기 바랍니다.</span>
                    </div>
                )}
                {helpBox2 && (
                    <div className="newDiv">
                        <span>ddd2</span>
                    </div>
                )}


                <div className="CustomerBox">
                    <button className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 게시판 사용 안내</span>
                        </div>
                    </button>
                    <button className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 룸 대여 모임 안내</span>
                        </div>
                    </button>
                    <button className="helpBox">
                        <div className="helpBoxText">
                            <span>Q. 인원 추가 및 삭제 안내</span>
                        </div>
                    </button>
                </div>


            </div>
        </div>
    )
}

export default CustomerService;