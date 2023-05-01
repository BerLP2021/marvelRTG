import { lazy } from 'react';
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';

import { Layout } from '../layout/Layout';
import MainPage from '../pages/MainPage';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './App.scss';

const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const SingleChar = lazy(() => import('../pages/singleChar/SingleChar'));
const SingleComic = lazy(() => import('../pages/singleComic/SingleComic'));
const Page404 = lazy(() => import('../pages/404'));


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
        element: <SinglePage Component={SingleComic} />,
        // lazy: () => import('../pages/SingleComicPage'),
      },
      {
        path: "/characters/:charId",
        element: <SinglePage Component={SingleChar} />,
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