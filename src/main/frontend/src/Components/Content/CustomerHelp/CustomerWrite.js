import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const CustomerWrite = () => {

    const navigate = useNavigate();
    const [CustomerWrite, setCustomerWrite] = useState({
        writeTitle: "",
        writeContent: "",
        writeDate: ""
    })
    const [memberRandom, setMemberRandom] = useState(null);

    const handleNavigate = () => {
        navigate('/mypage')
    }

    const handleInput = (e) => {
        setCustomerWrite({
            ...CustomerWrite,
            [e.target.name]: e.target.value,
        });
    }


    const onSubmit = (e) => {
        let random = null;
        random = Math.floor(10000000 + Math.random() * 99999999);
        setMemberRandom(random);

        e.preventDefault();
        axios.post("http://localhost:8099/api/customer/customerWrite", {
            CHIdx: Number(random),
            MemberId : sessionStorage.getItem("id"),
            CHContent: CustomerWrite.writeContent,
            CHTitle: CustomerWrite.writeTitle
        },
        {
            headers: {
                "Content-Type": "application/json", // 반드시 JSON으로 설정
            },
            })
            .then(response => {
                alert("문의가 접수 되었습니다.")
                navigate("/CustomerHelp/customerDetail");
                console.log(response.data);
            })
            .catch(error => {
                console.error("에러발생: ", error);
            })
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
                        <Link to='/CustomerHelp/CustomerService' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">고객센터</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
                <div className="Mypageheader2">
                    <div className="MypageheaderLine">
                        <Link to='/CustomerHelp/CustomerWrite' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">문의하기</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>

                <div className="CustomerServiceIcon1">
                    <div className="CustomerService">
                        <Link to='/CustomerHelp/CustomerWrite' style={{textDecoration: "none", display: "contents"}}>
                            <span>문의하기</span>
                            <img src='/img/icon/customerWrite.png' alt="문의하기" style={{width: "30px", height: "30px"}}/>
                        </Link>
                        <Link to='/CustomerHelp/customerDetail' style={{textDecoration: "none", display: "contents"}}>
                            <span>문의내역</span>
                            <img src='/img/icon/customerHistory.png' alt="문의하기"
                                 style={{width: "30px", height: "30px"}}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="CustomerBody1">
                <div className="CustomerBanner">
                    <span className="CustomerBodyText">SN스터디 고객센터</span>
                </div>
                <div className="helpText1">
                    <span>문의하기</span>
                </div>
                <div className="helpText2">
                    <span>제목, 내용에 개인정보를 입력하지 마세요.</span>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="helpInputBox">
                        <div className="helpInput">
                            <div className="helpLeft">
                                <span className="SpanText">아이디</span>
                                <span className="detailTitle">*</span>
                            </div>
                            <div className="helpRight">
                                <input type="text" value={sessionStorage.getItem("name")}/>
                            </div>
                        </div>
                        <div className="helpInput">
                            <div className="helpLeft">
                                <span className="SpanText">제목</span>
                                <span className="detailTitle">*</span>
                            </div>
                            <div className="helpRight2">
                                <input type="text" name="writeTitle" placeholder="100자 이내로 입력하세요." value={CustomerWrite.writeTitle} onChange={handleInput}/>
                            </div>
                        </div>
                        <div className="helpInput">
                            <div className="helpLeft">
                                <span className="SpanText">내용</span>
                                <span className="detailTitle">*</span>
                            </div>
                            <div className="helpRight3">
                                <input type="text" name="writeContent" placeholder="문의 내용을 적어주세요." value={CustomerWrite.writeContent} onChange={handleInput}/>
                            </div>
                        </div>
                        <button type="submit" className="helpBtn">문의하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerWrite;