import Root from '../pages/root/Root';
import Login from '../pages/login/Login';
import Error from '../pages/error/Error';
import Register from '../pages/register/Register';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

export default router;
