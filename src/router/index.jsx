import Home from '@/pages/Home';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/layouts/Layout';
import BookForm from '@/pages/BookForm';
import BookDetails from '@/pages/BookDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'books/:id', element: <BookDetails /> },
      { path: 'create', element: <BookForm /> },
      { path: 'edit/:id', element: <BookForm /> },
    ],
  },
]);

export default router;
