import React from "react";
import {BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";

const Mypage = () => {
        
    return (
        <>
            <div>
                <Link to="/mypage/mypageAccount">개인정보수정</Link>
                <Link to="/mypage/mypageBoard">작성한 글 확인</Link>
                <Link to="/mypage/mypageReview">내가 쓴 리뷰</Link>
                <Link to="/mypage/mypageAdd">시간 충전</Link>
            </div>
        </>
    )
}

export default Mypage;