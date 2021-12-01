import { Navigate, useRoutes } from 'react-router-dom';


//pages
import Mainpage from './page/Main/index';
// import Loginpage from './page/Login';

import Search from './page/Main/Search';
import Setting from './page/Main/Setting';

//-----------------------------------------------------
export default function Router() {
    return useRoutes([
      {
        path: '/main',
        element: <Mainpage />,
        children: [
          { element: <Navigate to="/main/search" replace /> },
          { path: 'search', element: <Search /> },
          { path: 'setting', element: <Setting /> },
        ]
      },
      {
        path: '/',
        children: [
          { path: '/', element: <Navigate to="/main" /> },
        ]
      },
    ]);
  }