import { lazy } from 'react';
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';

import { Layout } from '../layout/Layout';

import './App.scss';
import MainPage from '../pages/MainPage';
// import ComicsPage  from '../pages/ComicsPage';
// import Page404 from '../pages/404';
// import SingleComicPage from '../pages/SingleComicPage';
import ErrorMessage from '../errorMessage/ErrorMessage';

// const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Page404 = lazy(() => import('../pages/404'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
  const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    errorElement: <ErrorMessage/>, 
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/comics",
        element: <ComicsPage />,
        // lazy: () => import('../pages/ComicsPage'),
      },
      {
        path: "/comics/:comicId",
        element: <SingleComicPage />,
        // lazy: () => import('../pages/SingleComicPage'),
      },
      {
        path: "*",
        element: <Page404 />,
        // lazy: () => import('../pages/MainPage'),
      },
    ],
  }]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;