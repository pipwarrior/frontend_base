import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import UserContext from './context/UserContext.js';

import Routes from './Routes';
import Header from './Components/Layout/Header';

import './App.css';

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if(token === null) {
        localStorage.setItem('auth-token','');
        localStorage.setItem('accountType','')
        token='';
      }

      // Use this to check token timer
      const tokenRes = await axios.post(
        process.env.REACT_APP_API+'/api/auth/tokenIsValid',
        null,
        {headers: {'auth-token': token}}
      )

      if(tokenRes.data){
        const userRes = await axios.get(process.env.REACT_APP_API+'/api/users', {headers: {'auth-token': token}});
        setUserData({
          token: token,
          accountType: userRes.data.accountType,
          username: userRes.data.username,
          fullName: userRes.data.fullName
        })
      }
    }
    checkLoggedIn();
  }, [])
  
  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Routes />
      </UserContext.Provider>
    </Router>
  )
}

export default App;