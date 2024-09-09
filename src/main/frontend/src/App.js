// import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import axios from 'axios';
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
      <div>
        이곳은 테스트 입니다.ㅇㅇㅇsd : {hello}
      </div>
  );
}

export default App;
