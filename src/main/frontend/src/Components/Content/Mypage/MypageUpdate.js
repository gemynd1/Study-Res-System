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
        <div className="MyPage">
            <div className="Mypageheader">
                <div className="MypageHome">
                    <Link to='/'>
                        <img src="/img/icon/home.png" alt='/' className="icon"/>
                    </Link>
                </div>
                <div className="Mypageheader2">
                    <div className="MypageheaderLine">
                        <Link to='/mypage' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">마이페이지</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
                <div className="Mypageheader2">
                    <div className="MypageheaderLine">
                        <Link to='/mypage/mypageUpdate' style={{textDecoration: 'none'}}>
                            <span className="mypagetext">개인정보수정</span>
                        </Link>
                        <img src="/img/icon/arrow.png" alt='/' className="mypagearrow"/>
                    </div>
                </div>
            </div>


                <div>
                    Update
                    {MypageUpdate}
                </div>
        </div>


    )
}

export default MypageUpdate;