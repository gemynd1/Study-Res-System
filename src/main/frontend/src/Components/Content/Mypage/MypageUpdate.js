import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import axios from 'axios';
import MemberDeleteModal from "./MemberDeleteModal";
import PostCodePopup from "../Account/AccountCom/PostCodePopup";
import PhoneVali from "../Account/AccountCom/PhoneVali";

const MypageUpdate = () => {
    const [MypageUpdate, setMypageUpdate] = useState('');
    const [EditedValues, setEditedValues] = useState({});
    const navigate = useNavigate();
    const [MemberModalOpen, setMemberModalOpen] = useState(false);
    const [PasswordMessage, setPasswordMessage] = useState("");
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [authObj, setauthObj] = useState({
        phonenumber: "",
        pw: "",
    });

    const isNumeric = (input) =>
        /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4}$/.test(input); // 전화번호 정규식

    // 우편번호 API
    const [enroll_company, setEnroll_company] = useState(
        {
            address : '',
            zonecode: '',
            detailedAddress: '',
            latitude : '',
            longitude : ''});
    const [popup, setPopup] = useState(false);

    const MemberOpenModal = () => {
        setMemberModalOpen(true);
    }

    const [userInfo, setUserInfo] = useState([]);

    const [id, setId] = useState(sessionStorage.getItem("id"));
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [phone, setPhone] = useState('');


    useEffect(() => {
        if(sessionStorage.getItem("loginState") === "true") {
            axios.get("http://localhost:8099/api/mypage/mypageUpdate", {
                params: { id },
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    setUserInfo(response.data);
                    setEnroll_company((prevState) => ({
                        ...prevState,
                        address: data.maaddress,
                        detailedAddress: data.mdetailaddress,
                        zonecode: data.mzonecode,
                        latitude: data.malatitude,
                        longitude: data.malongitude
                    }))
                    // console.log(userInfo);
                    console.log(enroll_company);
                })
                .catch(error => {
                    console.error(error)
                    // alert('데이터 못가져옴')
                })
        } else {
            alert('오류가 발생하였습니다.')
            navigate('/');
        }
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();

        if (isPassword || authObj.pw === '') {
            axios.post("http://localhost:8099/api/update",
                {
                    "memberId": userInfo.memberId,
                    "memberName": userInfo.memberName,
                    "memberPhone": userInfo.memberPhone,
                    "memberPw":  authObj.pw ? authObj.pw : userInfo.memberPw,
                    "maaddress": enroll_company.address,
                    "mdetailaddress": enroll_company.detailedAddress,
                    "mzonecode": enroll_company.zonecode,
                    "malatitude": parseFloat(enroll_company.latitude),
                    "malongitude": parseFloat(enroll_company.longitude)
                },
                {
                    header: {'Content-Type': 'application/json'}
                }
            )
                .then(response => {
                    // console.log("수정", response.data);
                    alert('회원정보가 수정되었습니다.');
                    // sessionStorage.clear();
                    sessionStorage.setItem("name", userInfo.memberName );
                    navigate('/mypage');
                })
                .catch(error => {
                    console.error('에러발생', error);
                })
        } else {
            alert('회원정보 수정에 실패했습니다.')
        }
    }

    const handleInputChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleInputChange3 = (e) => {
        const result = e.target.value
            .replace(/[^0-9.]/g, "")
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(-{1,2})$/g, "");

        setUserInfo({
            ...userInfo,
            [e.target.name]: result
        });
    }

    const handleInputChange2 = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });

        setauthObj({
            ...authObj,
            pw: e.target.value
        });

        const isPwNumeric = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/; // 비밀번호 정규식
        const password = e.target.value;

        if (!isPwNumeric.test(password)) {
            setPasswordMessage("비밀번호는 8~30자의 영소문자, 숫자 !@*&-_만 입력 가능합니다.");
            setIsPassword(false);
        } else if (password.length < 8) {
            setPasswordMessage("8자 이상 입력해주세요");
            setIsPassword(false);
        } else {
            setPasswordMessage(null);
            console.log(userInfo);
            setIsPassword(true);
        }
    };


    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        if (MemberModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [MemberModalOpen]);



    const navigateBtn = () => {
        navigate('/mypage')
    };

    const [pwType, setpwType] = useState({
        type: "password",
        visible: false,
    })

    const [pwType2, setpwType2] = useState({
        type: "password",
        visible: false,
    })



    // 우편번호
    const handleComplete = (data) => {
        setPopup(!popup);
    }

    const handlePassWordType = (e) => {
        setpwType(() => {
            if (!pwType.visible){
                return { type: "text", visible: true}
            } else {
                return { type: "password", visible: false}
            }
        });
    }

    const handlePassWordType2 = (e) => {
        setpwType2(() => {
            if (!pwType2.visible) {
                return { type: "text", visible: true}
            } else {
                return { type: "password", visible: false}
            }
        });
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
                        <Link to='/mypage' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">마이페이지</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
                <div className="Mypageheader2">
                    <div className="MypageheaderLine">
                        <Link to='/mypage/mypageUpdate' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">개인정보수정</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
            </div>

            <div className="MypageUpdate">
                <div className="MypageMenu">
                    <Link to='/mypage/mypageUpdate' style={{textDecoration: 'none'}}>
                    <div className="updateText">
                        <img src="/img/icon/mypage.png" alt="개인정보수정"/>
                        <span className="menuText">개인정보수정</span>
                    </div>
                    </Link>
                        <div className="exitMember">
                            <img src="/img/icon/arrow2.png" alt="회원탈퇴" className="arrow2" />
                            <button onClick={() => MemberOpenModal()} className="exitMember2">회원탈퇴</button>
                        </div>
                    <Link to='/mypage/mypageBoard' style={{textDecoration: 'none'}}>
                        <div className="updateText2">
                            <img src="/img/icon/mypage2.png" alt="작성한 글 확인"/>
                            <span className="menuText">작성한 글 확인</span>
                        </div>
                    </Link>
                    <Link to='/mypage/mypageReview' style={{textDecoration: 'none'}}>
                        <div className="updateText2">
                            <img src="/img/icon/mypage3.png" alt="내가 쓴 리뷰"/>
                            <span className="menuText">내가 쓴 리뷰</span>
                        </div>
                    </Link>
                    <Link to='/mypage/mypageAdd' style={{textDecoration: 'none'}}>
                        <div className="updateText2">
                            <img src="/img/icon/mypage4.png" alt="시간충전"/>
                            <span className="menuText">시간충전</span>
                        </div>
                    </Link>
                    <Link to='/mypage/mypageCheck' style={{textDecoration: 'none'}}>
                        <div className="updateText2">
                            <img src="/img/icon/mypage5.png" alt="예약확인"/>
                            <span className="menuText">예약확인</span>
                        </div>
                    </Link>
                </div>


                <form onSubmit={handleUpdate}>
                    <div className="UpdateBody">
                        <div className="UpdateBodyText">
                            <span className="UpdateText">개인정보수정</span>
                            <p>회원님께서 입력하신 정보입니다. <br/>
                                수정을 원하시면 저장버튼을 눌러주세요.</p>
                            <div className="MemberInfoBox">
                                <span className="MemberInfo">회원정보</span>
                            </div>
                            <div className="UpdateInputBox">
                                <div className="Inputspan">
                                    <span>닉네임</span>
                                </div>
                                <div className="UpdateInput">
                                    <input
                                        type="text"
                                        placeholder="닉네임"
                                        id="memberName"
                                        name="memberName"
                                        value={userInfo.memberName}
                                        onChange={handleInputChange}
                                        />
                                </div>
                            </div>
                            <div className="UpdateInputBox">
                                <div className="Inputspan">
                                    <span>아이디</span>
                                </div>
                                <div className="UpdateInput">
                                    <input
                                        type="text"
                                        value={userInfo.memberId}
                                        readOnly
                                        />
                                </div>
                            </div>
                            <div className="UpdateInputBox">
                                <div className="Inputspan">
                                    <span>비밀번호 변경</span>
                                </div>
                                <div className="UpdateInput">
                                    <input
                                        type={pwType.type}
                                        placeholder="현재 비밀번호"
                                        value={userInfo.memberPw}
                                        id="memberPw"
                                        name="memberPw"
                                        onChange={handleInputChange2}
                                        />
                                    <span onClick={handlePassWordType}>
                                    {pwType.visible ? (
                                            <img src="/img/icon/password.png" alt="비밀번호 보기" className="UpdatepasswordIcon"/>)
                                        :
                                        (<img src="/img/icon/seepassword.png" alt="비밀번호 숨기기" className="UpdatepasswordIcon"/>
                                        )}
                                    </span>
                                    {authObj.pw.length > 0 && (
                                        <span
                                            style={{ color: "red", fontSize: "12px", display: "block" }}>
                                        {PasswordMessage}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {/*<div className="UpdateInputBox">*/}
                            {/*    <div className="Inputspan">*/}
                            {/*        <span>비밀번호 변경</span>*/}
                            {/*    </div>*/}
                            {/*    <div className="UpdateInput">*/}
                            {/*        <input*/}
                            {/*            type={pwType2.type}*/}
                            {/*            placeholder="새 비밀번호"*/}
                            {/*            id="memberNewPw"*/}
                            {/*            onChange={(e) => handleInputChnage('memberNewPw', e.target.value)}*/}
                            {/*            />*/}
                            {/*        <span onClick={handlePassWordType2}>*/}
                            {/*        {pwType2.visible ? (*/}
                            {/*                <img src="/img/icon/password.png" alt="비밀번호 보기" className="UpdatepasswordIcon"/>)*/}
                            {/*            :*/}
                            {/*            (<img src="/img/icon/seepassword.png" alt="비밀번호 숨기기" className="UpdatepasswordIcon"/>*/}
                            {/*            )}*/}
                            {/*    </span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="UpdateInputBox1">
                                <div className="Inputspan">
                                    <span>주소</span>
                                </div>
                                <div className="UpdateInput">
                                    <div className="postInput">
                                        <button type="button" className="postBtn" onClick={handleComplete}>우편번호 찾기
                                        </button>
                                        <input className="postInputbox" type="text" name="zonecode" id="zonecode" placeholder="우편번호"
                                               onChange={handleInput}
                                               value={enroll_company.zonecode} readOnly/>
                                    </div>
                                    {popup && <PostCodePopup company={enroll_company} setcompany={setEnroll_company}/>}
                                    <input
                                        // className="addressInput"
                                        type="text"
                                        placeholder="주소"
                                        value={enroll_company.address}
                                        name="address"
                                        id="address"
                                        onChange={handleInput}
                                        // onChange={(e) => handleInputChnage('MAaddress', e.target.value)}
                                    />
                                    <input type="hidden" id="latitude" name="latitude" value={enroll_company.latitude} />
                                    <input type="hidden" id="longitude" name="longitude" value={enroll_company.longitude} />
                                    <input
                                        className="addressInput"
                                        type="text"
                                        placeholder="상세주소"
                                        id="MDetailaddress"
                                        name="detailedAddress"
                                        value={enroll_company.detailedAddress}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>
                            <div className="UpdateInputBox">
                                <div className="Inputspan">
                                    <span>전화번호</span>
                                </div>
                                <div className="UpdateInput">
                                    {/*<PhoneVali*/}
                                    {/*    phone={authObj}*/}
                                    {/*    setPhone={setauthObj}*/}
                                    {/*    value={userInfo.memberPhone}*/}
                                    {/*    onInupt={handleInputChange3.memberPhone}*/}
                                    {/*    onChange={handleInputChange3}*/}
                                    {/*    validators={[*/}
                                    {/*        {*/}
                                    {/*            fn: (input) => input.length > 0,*/}
                                    {/*            message: "전화번호를 입력해주세요.",*/}
                                    {/*        },*/}
                                    {/*        {*/}
                                    {/*            fn: isNumeric,*/}
                                    {/*            message: "숫자만 입력해주세요.",*/}
                                    {/*        },*/}
                                    {/*        {*/}
                                    {/*            fn: (input) => input.length >= 10,*/}
                                    {/*            message: "10자 이상 입력해주세요.",*/}
                                    {/*        },*/}
                                    {/*    ]}*/}
                                    {/*    />*/}
                                <input
                                        type="text"
                                        value={userInfo.memberPhone}
                                        id="memberPhone"
                                        name="memberPhone"
                                        onChange={handleInputChange3}
                                        />
                                </div>
                            </div>
                            <div className="saveCheck">
                                <img src="/img/icon/check.png" alt="변경사항저장" className="check"/>
                                <button type="submit">변경사항 저장</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <MemberDeleteModal
                open={MemberModalOpen}
                onClose={() => setMemberModalOpen(false)}
            />
        </div>
    )
}

export default MypageUpdate;