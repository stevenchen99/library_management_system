import Home from '@/pages/Home';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/layouts/Layout';
import Create from '@/pages/Create';
import BookDetails from '@/pages/BookDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'books/:id', element: <BookDetails /> },
      { path: 'create', element: <Create /> },
    ],
  },
]);

export default router;
