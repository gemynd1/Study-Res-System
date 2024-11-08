// import React, {useEffect, useState} from "react";
// import {Link} from "react-router-dom";
// import Pagination from "../Mypage/Pagination";
// import axios from "axios";
// import {format} from "date-fns";

// const CustomerDetail = () => {


//     const [customerDetail, setCustomerDetail] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [resultsPerpage, setResultsPerpage] = useState(10);
//     const [id, setId] = useState(sessionStorage.getItem("id"));

//     const [expandedIndexes, setExpandedIndexes] = useState(false);

//     // 각 문의 내역을 클릭할 때 상세 내용을 토글
//     const handleToggleDetail = (index) => {
//         setExpandedIndexes((prevState) => ({
//             ...prevState,
//             [index]: !prevState[index], // 클릭한 항목의 상태를 반전
//         }));
//     };

//     useEffect(() => {
//         axios.get("http://localhost:8099/api/customer/customerView", {
//             params: { id },
//             headers: { 'Content-Type': 'application/json' },
//             withCredentials: true
//         })
//             .then(response => {
//                 setCustomerDetail(response.data);
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.error("에러발생: ", error);
//             })
//     }, []);

//     const indexOfLastResult = currentPage * resultsPerpage;
//     const indexOfFirstResult = indexOfLastResult - resultsPerpage;
//     const currentResults = customerDetail.slice(indexOfFirstResult, indexOfLastResult);
//     const total = customerDetail.length;

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     }

//     return (
//         <div className="MyPage">
//             <div className="Mypageheader">
//                 <div className="MypageHome">
//                     <Link to='/'>
//                         <img src="/img/icon/home.png" alt='/' className="icon"/>
//                     </Link>
//                 </div>
//                 <div className="Mypageheader2">
//                     <div className="MypageheaderLine">
//                         <Link to='/CustomerHelp/CustomerService' style={{textDecoration: 'none'}}>
//                             <span className="mypagetext">고객센터</span>
//                         </Link>
//                         <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
//                     </div>
//                 </div>
//                 <div className="Mypageheader2">
//                     <div className="MypageheaderLine">
//                         <Link to='/CustomerHelp/customerDetail' style={{textDecoration: 'none'}}>
//                             <span className="mypagetext">문의내역</span>
//                         </Link>
//                         <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
//                     </div>
//                 </div>

//                 <div className="CustomerServiceIcon1">
//                     <div className="CustomerService">
//                         <Link to='/CustomerHelp/CustomerWrite' style={{textDecoration: "none", display: "contents"}}>
//                             <span>문의하기</span>
//                             <img src='/img/icon/customerWrite.png' alt="문의하기" style={{width: "30px", height: "30px"}}/>
//                         </Link>
//                         <Link to='/CustomerHelp/customerDetail' style={{textDecoration: "none", display: "contents"}}>
//                             <span>문의내역</span>
//                             <img src='/img/icon/customerHistory.png' alt="문의하기"
//                                  style={{width: "30px", height: "30px"}}/>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//             <div className="CustomerDetailBody">
//                 <div className="CustomerText">
//                     <span className="DetailText">문의 내역</span>
//                 </div>
//                 {customerDetail && customerDetail.length > 0 ? (
//                     customerDetail.map((result, index) => (
//                         <div className="CustomerDetailBox" key={index} onClick={handleToggleDetail} >
//                             <div className="DetailBox">
//                                 <span>{result.chcontent}</span>
//                                 <div className="DetailBox2">
//                                     <span>{result.chdate ? format(new Date(result.chdate), 'yyyy-MM-dd') : null}</span>
//                                 </div>
//                             </div>
//                             {/* 클릭된 항목의 상세 내용을 표시 */}
//                             {expandedIndexes && (
//                                 <div className="DetailBox">
//                                     <p>상세 내용: {result.chcontent}</p>
//                                     {/* 다른 추가 정보도 여기에 표시할 수 있음 */}
//                                 </div>
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <div>
//                         <span style={{ fontSize: '30px', display: 'flex', justifyContent: 'center', padding: '190px' }}>
//                             문의 내역이 없습니다.
//                         </span>
//                     </div>
//                 )}


//                 <Pagination
//                     currentPage={currentPage}
//                     totalPages={Math.ceil(searchResults.length / resultsPerpage)}
//                     onPageChange={handlePageChange}
//                 />
//             </div>
//         </div>
//     );
// };

// export default CustomerDetail;