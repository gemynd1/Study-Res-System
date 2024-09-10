import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import axios from 'axios';

const MypageUpdate = () => {
    const [MypageUpdate, setMypageUpdate] = useState('')

    useEffect(() => {
        axios.get('/api/mypage/mypageUpdate')
            .then((res) => {
                setMypageUpdate(res.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            <div>
                Update
                {MypageUpdate}
            </div>
        </>
    )
}

export default MypageUpdate;