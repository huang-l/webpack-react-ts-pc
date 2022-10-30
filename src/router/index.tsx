import React, { Suspense, lazy, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../layout/MyLayout';
import ProjectConfig from '../pages/project/project-config/ProjectConfig';

const Home = lazy(() => import('../pages/home/Home'));
const Project = lazy(() => import('../pages/project/Project'));

const lazyLoad = (childNode: ReactNode) => {
  return <Suspense fallback={<>loading...</>}>{childNode}</Suspense>;
};

const routeConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: lazyLoad(<Home />),
      },
      {
        path: 'project',
        element: lazyLoad(<Project />),
      },
      // 如果没有匹配到任何路由 就跳转根目录(或者404页面)  类似于重定向
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
  {
    path: '/projectConfig/:id',
    element: <ProjectConfig />,
  },
];

export default routeConfig;
