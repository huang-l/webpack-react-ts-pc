import React, { Suspense, lazy, ReactNode } from "react";
import { Spin } from "antd";

const Login = lazy(() => import("@/pages/login/Login"));
const Layout = lazy(() => import("@/layout/MyLayout"));
const Home = lazy(() => import("@/pages/home/Home"));
const NotFound = lazy(() => import("@/pages/not-found/NotFound"));
const Project = lazy(() => import("@/pages/project/Project"));
const ProjectConfig = lazy(
  () => import("@/pages/project-config/ProjectConfig")
);

const lazyLoad = (childNode: ReactNode) => {
  return <Suspense fallback={<Spin />}>{childNode}</Suspense>;
};

const routeConfig = [
  {
    path: "/",
    element: lazyLoad(<Layout />),
    children: [
      { path: "", element: lazyLoad(<Home />) },
      { path: "project", element: lazyLoad(<Project />) },
    ],
  },
  { path: "/login", element: lazyLoad(<Login />) },
  { path: "/projectConfig/:id", element: lazyLoad(<ProjectConfig />) },
  // 如果没有匹配到任何路由 就跳转根目录(或者404页面)  类似于重定向
  { path: "*", element: lazyLoad(<NotFound />) },
];

export default routeConfig;
