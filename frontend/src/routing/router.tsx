import Root from '../pages/root/Root';
import Login from '../pages/login/Login';
import Error from '../pages/error/Error';
import Register from '../pages/register/Register';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import Tournament from '../pages/tournament/Tournament';
import { bracketLoader, tournamentDetailLoader } from '../utils/loaders';
import Bracket from '../pages/bracket/Bracket';
import MakePredictionPopup from '../components/popups/makePredictionPopup/MakePredictionPopup';
import NoneSelected from '../pages/home/NoneSelected';
import TournamentError from '../pages/error/TournamentError';

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
        children: [
          {
            errorElement: <TournamentError />,
            children: [
              {
                index: true,
                element: <NoneSelected />,
              },
              {
                path: '/tournament/:tournamentId',
                element: <Tournament />,
                loader: tournamentDetailLoader,
                children: [
                  {
                    path: '/tournament/:tournamentId/:userId',
                    element: <Bracket />,
                    loader: bracketLoader,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
