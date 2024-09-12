import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import axios from 'axios';
import Pagination from "./Pagination";

const MypageBoard = () => {
    const [MypageBoard, setMypageBoard] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerpage, setResultsPerpage] = useState(10);

    useEffect(() => {
        axios.get('/api/mypage/mypageBoard')
            .then((res) => {
                setMypageBoard(res.data);
            })
            .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        const result = [
            {
                title: "내가 작성 한 글 제목",
                writer: "백지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "정희수",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "김태랑",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "정희수",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "정희수",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "홍길동",
                Views: "100,000"
            },
            {
                title: "2",
                writer: "정희수",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "홍길동",
                Views: "100,000"
            },
            {
                title: "2",
                writer: "정희수",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "홍길동",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "홍길동",
                Views: "100,000"
            },
            {
                title: "2",
                writer: "정희수",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "홍길동",
                Views: "100,000"
            },
            {
                title: "2",
                writer: "정희수",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "1",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "김지민",
                Views: "100,000"
            },
            {
                title: "내가 작성 한 글 제목",
                writer: "홍길동",
                Views: "100,000"
            },
        ];
        setSearchResults(result);
    }, []);




    const indexOfLastResult = currentPage * resultsPerpage;
    const indexOfFirstResult = indexOfLastResult - resultsPerpage;
    const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);
    const total = searchResults.length;


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleResultsPerPageChange = (e) => {
        setResultsPerpage(parseInt(e.target.value, 10));
        setCurrentPage(1);
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
                        <Link to='/mypage/mypageBoard' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">작성한 글 확인</span>
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
                        <img src="/img/icon/arrow2.png" alt="회원탈퇴" className="arrow2" />
                        <span className="exitMember2">회원탈퇴</span>
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
                </div>

                <div className="UpdateBody">
                    <div className="UpdateBodyText">
                        <span className="UpdateText">작성한 글 확인</span>
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
                                        <th>조회수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentResults.map((result, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{result.title}</td>
                                            <td>{result.writer}</td>
                                            <td>{result.Views}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(searchResults.length / resultsPerpage)}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MypageBoard;