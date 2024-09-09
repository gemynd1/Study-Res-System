// import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import { BrowserRouter} from 'react-router-dom';

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

    </>
  );
}

export default App;
