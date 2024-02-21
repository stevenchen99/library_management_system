import Home from '@/pages/Home';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/layouts/Layout';
import BookForm from '@/pages/BookForm';
import BookDetails from '@/pages/BookDetails';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function index() {
  let { authReady, user } = useContext(AuthContext);

  let isAuthenticated = Boolean(user);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', element: isAuthenticated ? <Home /> : <Navigate to='/login' /> },
        { path: 'books/:id', element: isAuthenticated ? <BookDetails /> : <Navigate to='/login' /> },
        { path: 'create', element: isAuthenticated ? <BookForm /> : <Navigate to='/login' /> },
        { path: 'edit/:id', element: isAuthenticated ? <BookForm /> : <Navigate to='/login' /> },
        { path: 'register', element: !isAuthenticated ? <Register /> : <Navigate to='/' /> },
        { path: 'login', element: !isAuthenticated ? <Login /> : <Navigate to='/' /> },
      ],
    },
  ]);

  return authReady && <RouterProvider router={router} />;
}
