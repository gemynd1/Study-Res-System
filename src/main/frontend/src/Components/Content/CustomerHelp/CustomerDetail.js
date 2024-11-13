import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Pagination from "../Mypage/Pagination";
import axios from "axios";
import {format} from "date-fns";

const CustomerDetail = () => {


    const [customerDetail, setCustomerDetail] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerpage, setResultsPerpage] = useState(10);
    const [id, setId] = useState(sessionStorage.getItem("id"));

    const [expandedIndexes, setExpandedIndexes] = useState(false);

    // 각 문의 내역을 클릭할 때 상세 내용을 토글
    // const handleToggleDetail = (index) => {
    //     // 클릭된 인덱스가 현재 열려 있다면 닫고, 아니라면 추가
    //     setExpandedIndexes((prevIndexes) =>
    //         prevIndexes.includes(index)
    //             ? prevIndexes.filter((i) => i !== index) // 열려 있다면 닫기
    //             : [...prevIndexes, index] // 닫혀 있다면 열기
    //     );
    // };

    const handleToggleDetail = (index) => {
        setExpandedIndexes((prevIndex) => (prevIndex === index ? null : index)) // 같은 인덱스를 클릭하면 닫고 아니면 열기
    }

    useEffect(() => {
        axios.get("http://localhost:8099/api/customer/customerView", {
            params: { id },
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then(response => {
                setCustomerDetail(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("에러발생: ", error);
            })
    }, []);

    const indexOfLastResult = currentPage * resultsPerpage;
    const indexOfFirstResult = indexOfLastResult - resultsPerpage;
    const currentResults = customerDetail.slice(indexOfFirstResult, indexOfLastResult);
    const total = customerDetail.length;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                        <Link to='/CustomerHelp/customerDetail' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">문의내역</span>
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
            <div className="CustomerDetailBody">
                <div className="Customer22">
                    <div className="CustomerText">
                        <span className="DetailText">문의 내역</span>
                    </div>
                    {customerDetail && customerDetail.length > 0 ? (
                        customerDetail.map((result, index) => (
                            <div className="CustomerDetailBox" key={index} onClick={() => handleToggleDetail(index)} >
                                <div className="DetailBox">
                                    <span>{result.chtitle}</span>
                                    <div className="DetailBox2">
                                        <span>{result.chdate ? format(new Date(result.chdate), 'yyyy-MM-dd') : null}</span>
                                    </div>
                                </div>
                                {/* 클릭된 항목의 상세 내용을 표시 */}
                                {expandedIndexes === index && (
                                    <div className="DetailTitle">
                                        <div className="DetailTitle2">
                                            <span>{result.chtitle}</span>
                                        </div>
                                        <div className="DetailContent">
                                            <span>{result.chcontent}</span>
                                        </div>
                                        <div className="DetailContent2">
                                            <span>문의번호: {result.chidx}</span>
                                            <span>문의날짜: {result.chdate ? format(new Date(result.chdate), 'yyyy-MM-dd') : null}</span>
                                        </div>
                                        <div className="AdminContent">
                                            <div className="AdminTitle">
                                                <img src="/img/icon/logo.png" alt="snlogo" className="logo"/>
                                                <span>SN 스터디 고객센터 답변</span>
                                            </div>
                                            <div className="AdminContent1">
                                                <span>SN 스터디 고객센터의 답변 내용입니다</span>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>
                            <span style={{ fontSize: '30px', display: 'flex', justifyContent: 'center', padding: '190px' }}>
                                문의 내역이 없습니다.
                            </span>
                        </div>
                    )}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(searchResults.length / resultsPerpage)}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default CustomerDetail;