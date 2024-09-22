import React, {useState, useRef} from "react";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import JsonData from "../../../db/join.json";

import PostCodePopup from "./AccountCom/PostCodePopup";
import PhoneVali from "./AccountCom/PhoneVali";

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
                <button type={'button'} onClick={handleOpen}>{props.title}</button>
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

const Join = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const isNumeric = (input) => /^[0-9]+$/.test(input);

    // 우편번호 API
    const [enroll_company, setEnroll_company] = useState({address : '', zonecode: '', detailedAddress: ''});
    const [popup, setPopup] = useState(false);
    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]:e.target.value,
        })
    }
    const handleComplete = (data) => {
        setPopup(!popup);
    }

    // 카카오 로그인
    const handlekakaLogin = () => {
        window.location.href = kakaoURL;
    }

    // form input 체크
    const [authObj, setauthObj] = useState({
        nickname : "",
        zonecode : enroll_company.zonecode,
        address : enroll_company.address,
        detailAddress : "",
        phonenumber : phoneNumber,
        id : "",
        pw : ""
    });
    const [pwConfirm, setpwConfirm] = useState(""); // 비밀번호 확인
    const [idError, setIdError] = useState(""); // id 입력 에러
    const [pwError, setPwError] = useState(""); // 비밀번호 에러
    const [pwConfirmError, setpwConfirmError] = useState(""); // 비밀번호 확인 에러
    const [isIdCheck, setIsIdCheck] = useState(false); // 중복체크
    const [isIdAvailable, setIsIdAvailable] = useState(false); // id 사용가능여부

    const onChangeIdHandler = (e) => {
        const idValue = e.target.value;
        setauthObj({...authObj ["id"], idValue});
    }
    
    const onChangePasswordHandler = (e) => {
        const {name, value} = e.target;
        if(name === 'pw') {
            setauthObj({...authObj, [name] : value});
            passwordCheckHandler(value, pwConfirm);
        } else {
            setpwConfirm(value);
            passwordCheckHandler(authObj.pw, value);
        }
    }

    const idCheckHandler = async (id) => {
        const idRegex = /^[a-z\d]{5,20}$/;
        if (id === '') {
            setIdError('아이디를 입력해주세요.');
            setIsIdAvailable(false);
            return false;
        } else if (!idRegex.test(id)) {
            setIdError('아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다.');
            setIsIdAvailable(false);
            return false;
        } else {
            setIdError('사용 가능한 아이디 입니다.');
            ㄴ(true);
            setIsIdAvailable(true);
            return true;
        }
        // 서버 연동 후 진행 idcheck
        // try {
        //     const responseData = await idDuplicateCheck(id);
        //     if (responseData) {
        //         setIdError('사용 가능한 아이디입니다.');
        //         setIsIdCheck(true);
        //         setIsIdAvailable(true);
        //         return true;
        //     } else {
        //         setIdError('이미 사용중인 아이디입니다.');
        //         setIsIdAvailable(false);
        //         return false;
        //     }
        // } catch (error) {
        //     alert('서버 오류입니다. 관리자에게 문의하세요.');
        //     console.error(error);
        //     return false;
        // }
    }

    // 비밀번호 유효성 검사
    const passwordCheckHandler = (password, pwConfirm) => {
        const passwordRegex = /^[a-z\d!@*&-_]{8,30}$/;
        if (password === '') {
            setPwError('비밀번호를 입력해주세요.');
            return false;
        } else if (!passwordRegex.test(password)) {
            setPwError('비밀번호는 8~30자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
            return false;
        } else if (pwConfirm !== password) {
            setPwError('');
            setpwConfirmError('비밀번호가 일치하지 않습니다.');
            return false;
        } else {
            setPwError('');
            setpwConfirmError('');
            return true;
        }
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        
        const idCheckresult = await idCheckHandler([authObj.id]);
        if (idCheckresult) setIdError('');
        else return;
        if (!isIdCheck || !isIdAvailable) {
            alert('아이디 중복 검사를 해주세요.');
            return;
        }
    
        const passwordCheckResult = passwordCheckHandler([authObj.pw], pwConfirm);
        if (passwordCheckResult) { setPwError(''); setpwConfirmError(''); }
        else return;
        
        // 서버연동 후 진행 회원가입
        // try {
        //     const responseData = await signup(id, password, pwConfirm);
        //     if (responseData) {
        //         localStorage.setItem('loginId', id);
        //         setOpenModal(true);
        //     } else {
        //         alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
        //     }
        // } catch (error) {
        //     alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
        //     console.error(error);
        // }
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
                        <form className="form-content" onSubmit={signupHandler}> 
                            <div className="nickInput">
                                <input type="text" name="nickname" placeholder="닉네임" size={10} value={authObj.nickname} />
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
                                    name="detailAddress"
                                    placeholder="상세 주소"
                                    value={authObj.detailAddress}
                                />
                            </div>
                            <div className="phoneInput">
                                <PhoneVali
                                    value={phoneNumber}
                                    onInput={setPhoneNumber}
                                    validators={[
                                        {
                                            fn: (input) => input.length > 0,
                                            message: '내용을 입력해주세요.',
                                        },
                                        {
                                            fn: isNumeric,
                                            message: '숫자만 입력해주세요.',
                                        },
                                        {
                                            fn: (input) => input.length >= 10,
                                            message: '10자 이상 입력해주세요.',
                                        },
                                    ]}
                                />
                                {/* <input type="text" placeholder="전화번호"/>/ */}
                            </div>
                            <div className="idInput">
                                <input 
                                    type="text" 
                                    name="id" 
                                    placeholder="아이디" 
                                    size={30} 
                                    value={authObj.id} 
                                    onChange={onChangeIdHandler}
                                />
                                {idError && <small style={{color: 'red', fontSize: '12px', display: 'block'}} className={isIdAvailable ? 'idAvailable' : ''}>{idError}</small>}
                                {/* <button type="button" className="idcheckbtn">중복확인</button> */}
                            </div>
                            <div className="pwInput">
                                <input 
                                    type="password" 
                                    name="pw" 
                                    placeholder="비밀번호" 
                                    size={30} 
                                    value={authObj.pw} 
                                    onChange={onChangePasswordHandler}
                                />
                                {pwError && <small style={{color: 'red', fontSize: '12px', display: 'block'}}>{pwError}</small>}
                                <div className="pwCheckInfo">
                                    <span>- 비밀번호는 8~30자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.</span> <br />
                                    {/* <span>- 3개 이상 키보드 상 배열이 연속되거나 동일한 문자/숫자 제외</span> */}
                                </div>
                            </div>
                            <div className="pwCheck">
                                <input 
                                    type="password" 
                                    name="pwConfirm"
                                    placeholder="비밀번호 확인" 
                                    size={30} 
                                    value={pwConfirm}
                                    onChange={onChangePasswordHandler}    
                                />
                                {pwConfirmError && <small style={{color: 'red', fontSize: '12px', display: 'block'}}>{pwConfirmError}</small>}
                            </div>
                            <div className="agreecheck">
                                <div className="agree1">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="chkall" id="chkall" />
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
                                            <input type="checkbox" name="chk" id="chk" />
                                        </li>
                                        <li>
                                            <BasicModal title={'약관'} />
                                            서비스 이용약관(필수)
                                        </li>
                                    </ul>
                                </div>
                                <div className="agree3">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="chk" id="chk" />
                                        </li>
                                        <li>
                                            <BasicModal title={'개인정보'} />
                                            개인정보 수집 및 이용에 대한 안내(필수)
                                        </li>
                                    </ul>
                                </div>
                                <div className="agree4">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="chk" id="chk" />
                                        </li>
                                        <li>
                                            <BasicModal title={'위치정보'} />
                                            위치정보 이용약관 동의(필수)
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