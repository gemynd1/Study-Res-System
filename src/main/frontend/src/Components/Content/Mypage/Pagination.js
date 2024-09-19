import React, {useEffect, useState} from "react";
import "../../../style/Mypage.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const [focusedPage, setFocusedPage] = useState(null);

    if (totalPages <= 1) {
        return null;
    }

    const renderPageNumbers = () => {
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (startPage === 1){
            endPage = Math.min(5, totalPages);
        }

        if (endPage === totalPages){
            startPage = Math.max(1, totalPages - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
    };

    renderPageNumbers();

    return (
        <div className="pagination-container">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        className="page-link"
                        disabled={currentPage === 1}
                    >
                        <img src='/img/icon/pagination2.png' alt='이전' className="paginationIcon"/>
                    </button>
                </li>
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                            <button onClick={() => onPageChange(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className="page-link"
                        disabled={currentPage === totalPages}
                    >
                        <img src='/img/icon/pagination1.png' alt='다음' className="paginationIcon"/>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;