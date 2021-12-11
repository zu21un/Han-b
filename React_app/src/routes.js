import React, { useState, useEffect } from 'react';
import { Navigate, useRoutes, useNavigate } from 'react-router-dom';

//pages
import SearchPage from './page/Main/Search/index';
import SettingPage from './page/Main/Setting/index';
import LoginPage from './page/Main/Login/index';

import API from '@aws-amplify/api';
import { getUser } from './graphql/queries'


//-----------------------------------------------------
export default function Router() {
    const [userInfo, setUserInfo] = useState({id:'', Name:'', email:''});
    let navigate = useNavigate();

    const handleUser = (uid) => {
      console.log('handleUser Start!', uid);
      API.graphql({ query: getUser, variables:{ id: uid }})
      .then(res => {
        console.log('Setting', res);
        setUserInfo({id:uid, Name:res.data.getUser.name, email:res.data.getUser.email});
        console.log(userInfo);
      })
      .catch(e => console.log(e));
    }


    return useRoutes([
      {
        path: '/',
        children: [
          { path: '/', element: <Navigate to="/search" /> },
        ]
      },
      {
        path: 'search',
        element: <SearchPage userInfo={userInfo}/>
      },
      {
        path: 'setting',
        element: <SettingPage userInfo={userInfo} navigate={navigate}/>
      },
      {
        path: 'login',
        element: <LoginPage handleUser={handleUser} navigate={navigate}/>
      },
    ]);
  }