// import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Header from './Components/Layout/Header';
import Main from './Components/Content/Main';
// import './App.css';

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
      <BrowserRouter>
        <Header />
          <Main />
          {/* {hello} */}
        {/* <Routes>
          <Route></Route>
        </Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
