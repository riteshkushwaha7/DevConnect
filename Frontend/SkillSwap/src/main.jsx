import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Signup from '../Components/Signup.jsx';
import Login from '../Components/Login.jsx';
import Profilepage from '../Pages/Profilepage.jsx';
import EditProfileModal from '../Components/Editprofile.jsx';
import SkillRequestsPage from '../Components/Skill.jsx';
import Skillacceptpage from '../Pages/Skillacceptpage.jsx';
import Profile from '../Components/Profile.jsx'; // ✅ make sure this is imported

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/profile',
        element: <Profilepage />,
      },
      {
        path: '/skillreq',
        element: <SkillRequestsPage />,
      },
      {
        path: '/accept',
        element: <Skillacceptpage />,
      },
      {
        path: '/profile/:email', // ✅ dynamic email-based route
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
