// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";

import Main from "./Components/Content/Page/Main";
import Info from "./Components/Content/Page/Info";
import Review from "./Components/Content/Page/Review";
import Mypage from "./Components/Content/Page/Mypage";

import Board from "./Components/Content/Board/Board";
import BoardCategory from "./Components/Content/Board/BoardCategory";
import Post from "./Components/Content/Board/Post";
import PostWrite from "./Components/Content/Board/PostWrite";
import PostRewrite from "./Components/Content/Board/PostRewrite";

import MypageUpdate from "./Components/Content/Mypage/MypageUpdate";
import MypageBoard from "./Components/Content/Mypage/MypageBoard";
import MypageReview from "./Components/Content/Mypage/MypageReview";
import MypageAdd from "./Components/Content/Mypage/MypageAdd";
import Login from "./Components/Content/Account/login";
import Join from "./Components/Content/Account/join";
import OAuth from "./Components/Content/Account/oauth";
import MypageAccount from "./Components/Content/Mypage/MypageAccount";

import CustomerService from "./Components/Content/CustomerHelp/CustomerService";

import TeamDetail from "./Components/Content/Page/teamdetail";
import CustomerWrite from "./Components/Content/CustomerHelp/CustomerWrite";
import CustomerDetail from "./Components/Content/CustomerHelp/CustomerDetail";
import ReviewWrite from "./Components/Content/Review/ReviewWrite";
import ReviewDetail from "./Components/Content/Review/ReviewDetail";
import Template_Create from "./Components/template/Template_Create";
import Template_Editor from "./Components/template/Template_Editor";
import PaySuccess from "./Components/template/PaySuccess";
import MypageCheck from "./Components/Content/Mypage/MypageCheck";
import Chat from "./Components/Content/Page/Chating/Chat";
import Join2 from "./Components/Content/Page/Chating/join2";

import Loading from "./Components/template/Loading";

// import './App.css';
const ScrollToTop  = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const hideHeaderLogin =
    location.pathname === "/login" || location.pathname === "/join" || location.pathname === "/paysuccess";

  // useEffect(() => {
  //   axios.get('/api/hello')
  //       .then((res) => {
  //           setHello(res.data);
  //       })
  //       .catch(error => console.log(error))
  // }, []);

  const [showChat, setShowChat] = useState(true);

  const handleClick = () => {
    setShowChat(false);
  }

  return (
    <>
      {!hideHeaderLogin && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/info" element={<Info />} />
        <Route path="/board" element={<Board />} />
        <Route path="/review" element={<Review />} />
        <Route path="/review/:id" element={<ReviewDetail/>} />

        <Route
          path="/CustomerHelp/customerService"
          element={<CustomerService />}
        />
        <Route path="/CustomerHelp/customerWrite" element={<CustomerWrite />} />
        <Route
          path="/CustomerHelp/customerDetail"
          element={<CustomerDetail />}
        />

        <Route path="/board" element={<Board />} />
        <Route path="/board/category/*" element={<BoardCategory />} />
        <Route path="/board/post/*" element={<Post />} />
        <Route path="/board/postWrite" element={<PostWrite />} />
        <Route path="/board/postRewrite/*" element={<PostRewrite />} />

        <Route path="/review/post" element={<ReviewWrite />} />

        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/oauth" element={<OAuth />} />

          {/* mypage 따로 나눌수 있음 git merge */}
          <Route path="/mypage/*" element={<Mypage />} />
          <Route path="/mypage/mypageAccount" element={<MypageAccount />} />
          <Route path="/mypage/mypageUpdate" element={<MypageUpdate />} />
          <Route path="/mypage/mypageBoard" element={<MypageBoard />} />
          <Route path="/mypage/mypageReview" element={<MypageReview />} />
          <Route path="/mypage/mypageAdd" element={<MypageAdd />} />
          <Route path="/mypage/mypageCheck" element={<MypageCheck />} />

          <Route  path="/teamdetail" />
          <Route path="/teamdetail/:sgiId" element={<TeamDetail />} />
          <Route path="/paysuccess" element={<PaySuccess />} />  {/* 결제 성공창 */}

          <Route path="/chating/chat/*" element={<Chat />} />  {/* 채팅 */}
          <Route path="/chating/join2" element={<Join2 />} /> {/* 채팅 로그인 */}
          <Route path="/loading" element={<Loading />} />
      </Routes>
      {!hideHeaderLogin && <Footer />}


      <Routes>
        <Route path="/create" element={<Template_Create />} />
        <Route path="/editor" element={<Template_Editor />} />
      </Routes>
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
