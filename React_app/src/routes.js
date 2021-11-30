import { Navigate, useRoutes } from 'react-router-dom';


//pages
import Mainpage from './page/Main/index';
// import Loginpage from './page/Login';

//-----------------------------------------------------
export default function Router() {
    return useRoutes([
      {
        path: '/',
        element: <Mainpage />
        // children: [
        //   { path: 'login', element: <Login /> },
        //   { path: 'register', element: <Register /> },
        //   { path: '404', element: <NotFound /> },
        //   { path: '/', element: <Navigate to="/dashboard" /> },
        //   { path: '*', element: <Navigate to="/404" /> }
        // ]
      }
    //   { path: '*', element: <Navigate to="/404" replace /> }
    ]);
  }