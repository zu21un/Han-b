import { Navigate, useRoutes } from 'react-router-dom';

//pages
import SearchPage from './page/Main/Search/index';
import SettingPage from './page/Main/Setting/index';
// import Loginpage from './page/Login';


//-----------------------------------------------------
export default function Router() {
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
        element: <SettingPage />
      },
    ]);
  }