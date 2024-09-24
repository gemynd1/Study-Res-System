import React, {useState, useRef, useEffect, cloneElement} from "react";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import JsonData from "../../../db/join.json";

// 컴포넌트 연결
import PostCodePopup from "./AccountCom/PostCodePopup";
import PhoneVali from "./AccountCom/PhoneVali";
import IdVali from "./AccountCom/IdVali";
// import PwVali from "./AccountCom/PwVali";
// import PwCheckVali from "./AccountCom/PwCheckVali";


const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
const K_REDIRECT_URI = 'http://localhost:3000/oatuh';
const kakaoURL = 'https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 562,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 6,
    boxShadow: 24,
}

const BasicModal = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>  
            <div>
                <input type={'button'} onClick={handleOpen} value={props.title} />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                <div className="modal-header">
                        <span className="modal-header-title">{props.title}</span>
                    </div>
                    <div className="modal-title-section">
                        <span className="modal-title">질문</span>
                        <span className="modal-title-count1">0자</span>
                        <span className="modal-title-count2">/200자</span>
                    </div>
                    <div className="modal-caution-section">
                        {/* <img src="/img/icon/!(modal).png" alt="!" className="modal-caution-icon" /> */}
                        {/* <span className="modal-caution-text">단, 공간 및 예약에 대한 문의가 아닌 글은 무통보 삭제될 수 있습니다.</span> */}
                    </div>
                    <div className="modal-button-section">
                        <div onClick={handleClose} className="modal-active-button">
                            <span className="modal-active-text">확인</span>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

const Join = () => {
    const isNumeric = (input) => /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4}$/.test(input); // 전화번호 정규식
    const idRegex = (input) => /^[a-z\d]{5,20}$/.test(input); // 아이디 정규식
    // const isPwNumeric = (input) => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/.test(input); // 비밀번호 정규식, 영문 숫자 특수기호 조합 8자리 이상

    // input 체크
    const [authObj, setauthObj] = useState({nickname : '', phonenumber : '', id : '', pw : '', pwcheck : ''});
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
    const [PasswordMessage, setPasswordMessage] = useState('');
    const [PasswordConfirmMessage, setPasswordConfirmMessage] = useState('');
    const [allAgreed, setAllAgreed] = useState(false);
    const [agreement, setAgreement] = useState({isAgree1: false, isAgree2: false, isAgree3: false});

    // 우편번호 API
    const [enroll_company, setEnroll_company] = useState({address : '', zonecode: '', detailedAddress: ''});
    const [popup, setPopup] = useState(false);

    // 우편번호
    const handleComplete = (data) => {
        setPopup(!popup);
    }

    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]:e.target.value,
        });
    }
    const handleInput2 = (e) => {
        setauthObj({
            ...authObj,
            [e.target.name]:e.target.value,
        });
    }

    // 비밀번호 
    const password = (e) => {
        const passwordcurrent = e.target.value;
        setauthObj({
            ...authObj,
            pw : passwordcurrent,
        })
        const isPwNumeric = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/ // 비밀번호 정규식, 영문 숫자 특수기호 조합 8자리 이상
        if(!isPwNumeric.test(passwordcurrent)) {
            setPasswordMessage("형식에 맞지 않습니다.")
            setIsPassword(false)
        } else if(passwordcurrent.length <= 8) {
            setPasswordMessage("8자 이상 입력해주세요")
            setIsPassword(false)
        } else {
            setPasswordMessage(null)
            console.log(passwordcurrent)
            setIsPassword(true)
        }
        
    }

    // 비밀번호 확인
    const passwordCheck = (e) => {
        const passwordcheckcurrent = e.target.value
        setauthObj({
            ...authObj,
            pwcheck : passwordcheckcurrent,
        })
        // console.log(authObj.pw)
        // console.log(passwordcheckcurrent)
        if(authObj.pw === passwordcheckcurrent) {
            setPasswordConfirmMessage(null)
            setIsPasswordConfirm(true)
        } else {
            // console.log(authObj.pwcheck)
            setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.")
            setIsPasswordConfirm(false)
        }
    }

    // 체크박스
    const handleAgreementChange = (e) => {
        const {name, checked} = e.target;
        setAgreement({
            ...agreement,
            [name]: e.target.checked
        })

        const allChecked = Object.values({ ...agreement, [name]: checked }).every(value => value === true);
        setAllAgreed(allChecked);
    }

    const handleAllAgreeChange = (e) => {
        const {checked} = e.target;
        setAgreement((prevAgreenment) => 
            Object.keys(prevAgreenment).reduce(
                (newAgreement, agreementKey) => ({
                    ...newAgreement,
                    [agreementKey] : checked,
                }),
                {}
            )
        );
        setAllAgreed(checked)
    }

    // 카카오 로그인
    const handlekakaLogin = () => {
        window.location.href = kakaoURL;
    }

    // console.log(JsonData);
    
    
    return (
        <>
            <section className="joinSec">
                <div className="joinMain">
                    <div className="join-tit">
                        <span>회원가입</span>
                    </div>
                    <div className="joinContent">
                        <button onClick={handlekakaLogin} className="kakaoButton">
                            <img src="/img/kakao_login_btn.png" />
                        </button>
                        <div className="hrline">
                            <hr className="line1" />
                            <div className="linecenter">   
                                <h2>또는</h2>
                            </div>
                            <hr className="line2" />    
                        </div>
                        <form className="form-content"> 
                            <div className="nickInput">
                                <input type="text" name="nickname" placeholder="닉네임" onChange={handleInput2} value={authObj.nickname} required />
                            </div>
                            <div class="postInput">
                                <input type="text" name="zonecode" placeholder="우편번호" onChange={handleInput} value={enroll_company.zonecode} readOnly />
                                <button type="button" className="postBtn" onClick={handleComplete}>우편번호 찾기</button>
                            </div>
                            {popup && <PostCodePopup company={enroll_company} setcompany={setEnroll_company} />}
                            <div class="addInput">
                                <input type="text" name="address" placeholder="도로명 주소" onChange={handleInput} value={enroll_company.address} readOnly />
                            </div>
                            <div class="detailAddInput">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="detailedAddress"
                                    placeholder="상세 주소"
                                    value={enroll_company.detailedAddress}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="phoneInput">
                                <PhoneVali
                                    value={authObj.phonenumber}
                                    onInput={handleInput2.phonenumber}
                                    onChange={handleInput2}
                                    validators={[
                                        {
                                            fn: (input) => input.length > 0,
                                            message: '전화번호를 입력해주세요.',
                                        },
                                        {
                                            fn: isNumeric,
                                            message: "숫자만 입력해주세요.",
                                        },
                                        {
                                            fn: (input) => input.length >= 10,
                                            message: '10자 이상 입력해주세요.',
                                        },
                                    ]}
                                    
                                />
                            </div>
                            <div className="idInput">
                                <IdVali
                                    value={authObj.id}
                                    onInput={handleInput2.id}
                                    onChange={handleInput2}
                                    validators={[
                                        {
                                            fn: (input) => input.length > 0,
                                            message: '아이디를 입력해주세요.',
                                        },
                                        {
                                            fn : idRegex,
                                            message : '아이디는 5~20자의 영소문자, 숫자만 입력 가능합니다.',
                                        },
                                        {
                                            fn: (input) => input.length >= 5,
                                            message: '5자 이상 입력해주세요.',
                                        },
                                        // {
                                        //     fn: isIdCheck,
                                        //     message: '아이디 중복 검사를 해주세요.',
                                        // },
                                    ]}
                                    
                                />
                                {/* <button type="button" className="idcheckbtn">중복확인</button> */}
                            </div>
                            <div className="pwInput">
                                <input 
                                    type="password" 
                                    name="pw"
                                    placeholder="비밀번호"
                                    onChange={password}
                                    value={authObj.pw}
                                    required
                                />
                                {authObj.pw.length > 0 && (
                                    <span style={{color: 'red', fontSize: '12px', display: 'block'}}>{PasswordMessage}</span>
                                )}
                                <div className="pwCheckInfo">
                                    <span>- 비밀번호는 8~30자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.</span> <br />
                                    {/* <span>- 3개 이상 키보드 상 배열이 연속되거나 동일한 문자/숫자 제외</span> */}
                                </div>
                            </div>
                            <div className="pwCheck">
                                <input 
                                    type="password" 
                                    name="pwcheck"
                                    placeholder="비밀번호 확인"
                                    onChange={passwordCheck}
                                    value={authObj.pwcheck}
                                    required
                                />
                                {authObj.pwcheck.length > 0 && (
                                    <span style={{color: 'red', fontSize: '12px', display: 'block'}}>{PasswordConfirmMessage}</span>
                                )}
                            </div>
                            <div className="agreecheck">
                                <div className="agree1">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="chkall" id="chkall" 
                                                checked={allAgreed}
                                                onChange={handleAllAgreeChange} />
                                        </li>
                                        <li>
                                            아래 약관에 모두 동의합니다.
                                        </li>
                                    </ul>
                                </div>
                                <hr className="line3" />
                                <div className="agree2">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="isAgree1" id="isAgree1" 
                                                checked={agreement.isAgree1} 
                                                onChange={handleAgreementChange}
                                                required />
                                        </li>
                                        <li>
                                            <BasicModal title={'약관'} /> 서비스 이용약관(필수)
                                        </li>
                                    </ul>
                                </div>
                                <div className="agree3">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="isAgree2" id="isAgree2" 
                                                checked={agreement.isAgree2} 
                                                onChange={handleAgreementChange}
                                                required />
                                        </li>
                                        <li>
                                            <BasicModal title={'개인정보'} /> 개인정보 수집 및 이용에 대한 안내(필수)
                                        </li>
                                    </ul>
                                </div>
                                <div className="agree4">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="isAgree3" id="isAgree3" 
                                                checked={agreement.isAgree3} 
                                                onChange={handleAgreementChange}
                                                required />
                                        </li>
                                        <li>
                                            <BasicModal title={'위치정보'} /> 위치정보 이용약관 동의(필수)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <input type="submit" className="joinbtn" value={"회원가입"} />
                        </form>
                    </div>
                    <div className="joinImg">
                        <img src="/img/snlogo.png" alt="snlogo" className="logo" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Join;