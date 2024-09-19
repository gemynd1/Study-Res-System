// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";

import Main from './Components/Content/Page/Main';
import Info from './Components/Content/Page/Info';
import Board from './Components/Content/Board/Board';
import BoardCategory from './Components/Content/Board/BoardCategory';
import Post from './Components/Content/Board/Post';
import PostRewrite from './Components/Content/Board/PostRewrite';
import Review from './Components/Content/Page/Review';
import Mypage from "./Components/Content/Page/Mypage";
import TeamDetail from "./Components/Content/Page/teamdetail";

import MypageUpdate from "./Components/Content/Mypage/MypageUpdate";
import MypageBoard from "./Components/Content/Mypage/MypageBoard";
import MypageReview from "./Components/Content/Mypage/MypageReview";
import MypageAdd from "./Components/Content/Mypage/MypageAdd";
import Login from "./Components/Content/Account/login";
import Join from "./Components/Content/Account/join";
import MypageAccount from "./Components/Content/Mypage/MypageAccount";

// import './App.css';

function AppContent() {
  const [hello, setHello] = useState("");
  const location = useLocation();
  const hideHeaderLogin =
    location.pathname === "/login" || location.pathname === "/join";



  // useEffect(() => {
  //   axios.get('/api/hello')
  //       .then((res) => {
  //           setHello(res.data);
  //       })
  //       .catch(error => console.log(error))
  // }, []);

  return (
    <>
      {!hideHeaderLogin && <Header />}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/info' element={<Info />} />
        <Route path='/board' element={<Board />} />
        <Route path='/board/category/*' element={<BoardCategory />} />
        <Route path='/board/post/*' element={<Post />} />
        <Route path='/board/postRewrite/*' element={<PostRewrite />} />
        <Route path='/review' element={<Review />} />

        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />

        {/* mypage 따로 나눌수 있음 git merge */}
        <Route path="/mypage/*" element={<Mypage />} />
        <Route path="/mypage/mypageAccount" element={<MypageAccount />} />
        <Route path="/mypage/mypageUpdate" element={<MypageUpdate />} />
        <Route path="/mypage/mypageBoard" element={<MypageBoard />} />
        <Route path="/mypage/mypageReview" element={<MypageReview />} />
        <Route path="/mypage/mypageAdd" element={<MypageAdd />} />

        {/* teamdetail페이지 */}
        <Route path="/teamdetail" element={<TeamDetail />} />
      </Routes>
      {!hideHeaderLogin && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
