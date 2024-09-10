import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import axios from 'axios';

const MypageAdd = () => {
    const [MypageAdd, setMypageAdd] = useState('')

    useEffect(() => {
        axios.get('/api/mypage/mypageAdd')
            .then((res) => {
                setMypageAdd(res.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            <div>
                Add
                {MypageAdd}
            </div>
        </>
    )
}

export default MypageAdd;