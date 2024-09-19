import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import axios from 'axios';

const MypageAccount = () => {
    const [MypageAccount, setMypageAccount] = useState('')

    useEffect(() => {
        axios.get('/api/mypage/mypageAccount')
            .then((res) => {
                setMypageAccount(res.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            <div>
                Account
                {MypageAccount}
            </div>
        </>
    )
}

export default MypageAccount;