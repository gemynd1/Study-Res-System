import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import MemberDeleteModal from "./MemberDeleteModal";
import Pagination from "./Pagination";
import Pagination2 from "./Pagination2";
import axios from "axios";

const MypageCheck = () => {
    const [MypageGroupResult, setMypageGroupResult] = useState([]);
    const [MypageInviResult, setMypageInviResult] = useState([{
        studyOrderPayVo : [],
        ttocontent : "",
    }]);
    const [parsedResults, setParsedResults] = useState([]);

    const [MypageCheck, setMypageCheck] = useState([]);
    const [MemberModalOpen, setMemberModalOpen] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerpage, setResultsPerpage] = useState(5);

    const [currentPage2, setCurrentPage2] = useState(1);
    const [resultsPerpage2, setResultsPerpage2] = useState(5);

    const indexOfLastResult = currentPage * resultsPerpage;
    const indexOfFirstResult = indexOfLastResult - resultsPerpage;
    const currentResults = MypageGroupResult.slice(indexOfFirstResult, indexOfLastResult);

    const indexOfLastResult2 = currentPage2 * resultsPerpage2;
    const indexOfFirstResult2 = indexOfLastResult2 - resultsPerpage2;
    const cuurentResults2 = parsedResults.slice(indexOfFirstResult2, indexOfLastResult2);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handlePageChange2 = (pageNumber) => {
        setCurrentPage2(pageNumber);
    }

    const MemberOpenModal = () => {
        setMemberModalOpen(true);
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

    useEffect(() => {
        Promise.all([
            axios.get(`http://localhost:8099/api/mypage/mypageGroupCheck?MemberId=${sessionStorage.getItem("id")}`),
            axios.get(`http://localhost:8099/api/mypage/mypageInviCheck?MemberId=${sessionStorage.getItem("id")}`)
        ],
            { headers : {'Content-Type' : 'application/json'}
        })
        .then(
            axios.spread((res1, res2) => {
                setMypageGroupResult(res1.data);
                setMypageInviResult(res2.data);
                console.log(res1.data)
                console.log(res2.data)
            })
        )
        .catch(error => {
            console.error("에러발생: ", error);
        });
    }, []); 

    useEffect(() => {
        const parsedData = MypageInviResult.map((item) => {
            try {
                const parsedContent = JSON.parse(item.ttocontent);
                // console.log(parsedContent);
                return { ...item, ttocontent: parsedContent };
            } catch (error) {
                console.error("Error parsing ttocontent:", error);
                return { ...item, ttocontent: [] };
            }
        });
        setParsedResults(parsedData);
    }, [MypageInviResult]);

    return(
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
                        <Link to='/mypage/mypageCheck' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">예약확인</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
            </div>

            <div className="MypageCheck">
                <div className="MypageMenu2">
                    <Link to='/mypage/mypageUpdate' style={{textDecoration: 'none' }}>
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

                <div className="CheckBody">
                    <div className="CheckTitle">
                        <span>나의 예약 목록</span>
                    </div>
                    <div className="CheckContent">
                        <div className="CheckRoom">
                            <img src="/img/icon/logo.png" style={{width: "79px", height: "64px"}} alt="로고"/>
                            <span>룸 예약 목록</span>
                        </div>
                        <div className="CheckRoom2">
                            <div className="CheckRoom3">
                                <table className="CheckRoomTable">
                                    <thead>
                                    <tr>
                                        <th>예약번호</th>
                                        <th>예약일시</th>
                                        <th>예약내역</th>
                                        <th>금액</th>
                                        <th>상태</th>
                                        {/* <th>취소</th> */}
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {currentResults != '' ? 
                                            currentResults.map((result, index) => (
                                                <tr key={index}>
                                                    <td>{result.sgonum}</td>
                                                    <td>{result.sgoregDate}</td>
                                                    <td>{result.studyGInfoVo.sgicontent1} - {result.sgoregDate} ({result.sgostartDate} ~ {result.sgoendDate}) - {result.sgopeople}명</td>
                                                    <td>{result.sgototal}원</td>
                                                    <td>
                                                        <button>
                                                            {
                                                                new Date() > new Date(result.sgoregDate) ? "사용 완료" : 
                                                                        new Date().getHours() === result.sgostartDate - 1 ? "예약 1시간 전" : "예약 완료"
                                                            }
                                                        </button>
                                                    </td>
                                                    {/* <td><button>취소</button></td> */}
                                                </tr>
                                            ))
                                            : 
                                            <tr>
                                                <td colSpan="6">검색 결과가 없습니다.</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                                <Pagination2
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(MypageGroupResult.length / resultsPerpage)}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="CheckContent2">
                        <div className="CheckRoom">
                            <img src="/img/icon/logo.png" style={{width: "79px", height: "64px"}} alt="로고"/>
                            <span>개인좌석시간 충전 목록</span>
                        </div>
                        <div className="CheckRoom2">
                            <table className="CheckRoomTable">
                                <thead>
                                <tr>
                                    <th>충전번호</th>
                                    <th>충전일시</th>
                                    <th>충전내역</th>
                                    <th>금액</th>
                                    <th>상태</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {cuurentResults2 != '' ? 
                                        cuurentResults2.map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.ttocontent[0]?.random}</td>
                                            <td>{result.studyOrderPayVo.tsopdate?.replace(/T.*/, "")}</td>
                                            <td>
                                            {/* result.ttocontent[0]?.sipname && typeof result.ttocontent[0]?.sipname === "string"  */}
                                                {
                                                    result.ttocontent[0]?.sipname.includes("년") || result.ttocontent[0]?.sipname.includes("주") 
                                                    ? result.ttocontent[0]?.sipname : result.ttocontent[0]?.sipname + "시간" 
                                                }
                                                    {/* : result.ttocontent[0]?.sipname */}
                                            </td>
                                            <td>{result.studyOrderPayVo.tsopprice}원</td>
                                            <td>
                                                <button>결제완료</button>
                                            </td>
                                        </tr>
                                        )) :
                                        <tr>
                                            <td colSpan="6">검색 결과가 없습니다.</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <Pagination2
                                currentPage={currentPage2}
                                totalPages={Math.ceil(MypageInviResult.length / resultsPerpage2)}
                                onPageChange={handlePageChange2}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <MemberDeleteModal
                open={MemberModalOpen}
                onClose={() => setMemberModalOpen(false)}
            />

        </div>
    )
}

export default MypageCheck;