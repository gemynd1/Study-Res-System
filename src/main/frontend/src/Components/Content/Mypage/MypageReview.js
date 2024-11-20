import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios';
import Pagination from "./Pagination";
import MemberDeleteModal from "./MemberDeleteModal";
import {format} from "date-fns";

const MypageReview = () => {
    const [MypageReview, setMypageReview] = useState([])
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerpage, setResultsPerpage] = useState(10);
    const [id, setId] = useState(sessionStorage.getItem("id"));
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8099/api/mypage/mypageReview",
            {
                params: { id },
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then(response => {
                setMypageReview(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("에러발생: ", error);
            })
    }, []);


    const [MemberModalOpen, setMemberModalOpen] = useState(false);

    const MemberOpenModal = () => {
        setMemberModalOpen(true);
    }

    const indexOfLastResult = currentPage * resultsPerpage;
    const indexOfFirstResult = indexOfLastResult - resultsPerpage;
    const currentResults = MypageReview.slice(indexOfFirstResult, indexOfLastResult);
    const total = MypageReview.length;

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
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleResultsPerPageChange = (e) => {
        setResultsPerpage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    
    const handleReviewClick = (review) => {
        navigate(`/review/${review}`, { state: { review } });
    };

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
                        <Link to='/mypage/mypageReview' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">내가 쓴 리뷰</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
            </div>

            <div className="MypageUpdate2">
                <div className="MypageMenu">
                    <Link to='/mypage/mypageUpdate' style={{textDecoration: 'none'}}>
                        <div className="updateText">
                            <img src="/img/icon/mypage.png" alt="개인정보수정"/>
                            <span className="menuText">개인정보수정</span>
                        </div>
                    </Link>
                    <div className="exitMember">
                        <img src="/img/icon/arrow2.png" alt="회원탈퇴" className="arrow2"/>
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

                <div className="UpdateBody">
                    <div className="UpdateBodyText">
                        <span className="UpdateText">내가 쓴 리뷰</span>
                        <div className="AllText">
                            <span>전체 {total}</span>
                        </div>
                        <div className="seeWrite">
                            <table className="table-container">
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>제목</th>
                                        <th>작성자</th>
                                        <th>작성일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {currentResults != '' ?
                                    currentResults.map((result, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td onClick={() => handleReviewClick(result.sridx)}>
                                                {/* onClick={() => handleReviewClick(result.sridx)} */}
                                                {/* <Link to={`/review/${result.sridx}`}> */}
                                                    {result.srcontent}
                                                {/* </Link> */}
                                            </td>
                                            <td>{result.memberName}</td>
                                            <td>{result.srregDate ? format(new Date(result.srregDate), 'yyyy-MM-dd HH:mm:ss') : null}</td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="4">검색 결과가 없습니다.</td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(MypageReview.length / resultsPerpage)}
                                onPageChange={handlePageChange}
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
    );
};

export default MypageReview;