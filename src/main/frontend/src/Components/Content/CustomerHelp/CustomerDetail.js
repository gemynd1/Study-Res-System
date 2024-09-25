import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Pagination from "../Mypage/Pagination";

const CustomerDetail = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerpage, setResultsPerpage] = useState(10);


    useEffect(() => {
        const result = [
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
            {
                title: '안녕하세요 문의 드립니다.',
                date: '2024.09.19',
            },
        ];
        setSearchResults(result)
    }, []);

    const indexOfLastResult = currentPage * resultsPerpage;
    const indexOfFirstResult = indexOfLastResult - resultsPerpage;
    const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);
    const total = searchResults.length;

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
                <div className="CustomerText">
                    <span className="DetailText">문의 내역</span>
                </div>

                {currentResults.map((result, index) => (
                    <div className="CustomerDetailBox">
                        <div className="DetailBox">
                            <span>{result.title}</span>
                            <div className="DetailBox2">
                                <span>{result.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
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