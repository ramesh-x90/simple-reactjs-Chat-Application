import { Route, Routes } from "react-router-dom";
import Home from "./Presentation/Home/Home";
import About from "./Presentation/About/About";
import SignIn from "./Presentation/SignIn/SignIn";
import SignUp from "./Presentation/SignUp/SignUp";
import React from "react";
import PublicChat from "Presentation/public-chat/publicChat";

interface route {
  id: number;
  name: string;
  path: string;
  element: JSX.Element;
  inTopNav?: boolean;
}

const navBarRoutes: route[] = [
  { id: 1, name: "Home", path: "/", element: <Home />, inTopNav: true },
  { id: 2, name: "About", path: "/About", element: <About />, inTopNav: true },
  {
    id: 3,
    name: "Sign In",
    path: "/Sign-In",
    element: <SignIn />,
    inTopNav: true,
  },
  {
    id: 4,
    name: "Sign Up",
    path: "/Sign-Up",
    element: <SignUp />,
    inTopNav: true,
  },
  { id: 5, name: "Public Chat", path: "/Public-Chat", element: <PublicChat /> },
];

const navBarRoutesEx = navBarRoutes.map((it) => ({
  id: it.id,
  name: it.name,
  path: it.path,
  inTopNav: it.inTopNav,
}));

function AppRoutes() {
  return (
    <Routes>
      {navBarRoutes.map((it) => (
        <Route key={it.id} path={it.path} element={it.element}></Route>
      ))}
    </Routes>
  );
}

export { AppRoutes, navBarRoutesEx as navBarRoutes };
