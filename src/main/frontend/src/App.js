// import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import './App.css';

function Header() {
  return (
    <header>
      <div id="header_bar">
        <div id="menu_bar">
          <div id="logo_icon"></div>
          <div id="home_link">홈</div>
          <div id="information_link">정보</div>
          <div id="community_link">게시판</div>
          <div id="review_link">리뷰</div>
        </div>
        <div id="alarm_button_section">
          <div id="alarm_button"></div>
        </div>
        <div id="message_button_section">
          <div id="message_button"></div>
        </div>
        <div id="login_button">8</div>
        <div id="logout_button">9</div>
      </div>
    </header>
  )
}

function App() {
  const [hello, setHello] = useState('')

  useEffect(() => {
    axios.get('/api/hello')
        .then((res) => {
            setHello(res.data);
        })
        .catch(error => console.log(error))
  }, []);

  return (
    <>
    <main>
      <Header></Header>
      <div>
        이곳은 테스트 입니다.ㅇㅇㅇ : {hello}
      </div>
    </main>
    </>
  );
}

export default App;
