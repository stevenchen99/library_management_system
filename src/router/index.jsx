import Home from '@/pages/Home';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/layouts/Layout';
import BookForm from '@/pages/BookForm';
import BookDetails from '@/pages/BookDetails';
import Register from '@/pages/Register';
import Login from '@/pages/Login';

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

export default router;
