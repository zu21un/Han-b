import { Navigate, useRoutes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

//pages
import SearchPage from './page/Main/Search/index';
import SettingPage from './page/Main/Setting/index';
import LoginPage from './page/Main/Login/index';
import SignupPage from './page/Main/Signup/index';
import FindPasswordPage from './page/Main/FindPassword/index';

//-----------------------------------------------------
export default function Router() {
    const [userId, setUserId] = useState("")
    let navigate = useNavigate();

    return useRoutes([
      {
        path: '/',
        children: [
          { path: '/', element: <Navigate to="/search" /> },
        ]
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'setting',
        element: <SettingPage userId={userId} navigate={navigate}/>
      },
      {
        path: 'login',
        element: <LoginPage setUserId={setUserId} navigate={navigate}/>
      },
      {
        path: 'signup',
        element: <SignupPage setUserId={setUserId} navigate={navigate}/>
      },
      {
        path: 'findpassword',
        element: <FindPasswordPage setUserId={setUserId} navigate={navigate}/>
      }
    ]);
  }