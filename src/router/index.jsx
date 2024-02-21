import Home from '@/pages/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/layouts/Layout';
import BookForm from '@/pages/BookForm';
import BookDetails from '@/pages/BookDetails';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function index() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'books/:id', element: <BookDetails /> },
        { path: 'create', element: <BookForm /> },
        { path: 'edit/:id', element: <BookForm /> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
      ],
    },
  ]);

  let { authReady } = useContext(AuthContext);
  return authReady && <RouterProvider router={router} />;
}
