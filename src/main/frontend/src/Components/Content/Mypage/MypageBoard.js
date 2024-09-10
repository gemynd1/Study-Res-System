import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import axios from 'axios';

const MypageBoard = () => {
    const [MypageBoard, setMypageBoard] = useState('')

    useEffect(() => {
        axios.get('/api/mypage/mypageBoard')
            .then((res) => {
                setMypageBoard(res.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            <div>
                Board
                {MypageBoard}
            </div>
        </>
    )
}

export default MypageBoard;