import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import axios from 'axios';

const Mypage = () => {
    const [Mypage, setMypage] = useState('')

    useEffect(() => {
        axios.get('/api/mypage')
            .then((res) => {
                setMypage(res.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            <div>
                {Mypage}
                <Link to="/mypage/mypageAccount">개인정보확인</Link>
                <Link to="/mypage/mypageUpdate">개인정보수정</Link>
                <Link to="/mypage/mypageBoard">작성한 글 확인</Link>
                <Link to="/mypage/mypageReview">내가 쓴 리뷰</Link>
                <Link to="/mypage/mypageAdd">시간 충전</Link>
            </div>
        </>
    )
}

export default Mypage;