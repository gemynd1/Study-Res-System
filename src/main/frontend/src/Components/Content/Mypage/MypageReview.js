import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import axios from 'axios';

const MypageReview = () => {
    const [MypageReview, setMypageReview] = useState('')

    useEffect(() => {
        axios.get('/api/mypage/mypageReview')
            .then((res) => {
                setMypageReview(res.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            <div>
                Reviw
                {MypageReview}
            </div>
        </>
    )
}

export default MypageReview;