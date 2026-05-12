import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";

import ActivityDetailPage from "./pages/ActivityDetailPage.jsx";
import ActivityListPage from "./pages/ActivityListPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import HomeDefaultPage from "./pages/HomeDefaultPage.jsx";
import HomeLoggedInPage from "./pages/HomeLoggedInPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfileDetailsPage from "./pages/ProfileDetailsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomeDefaultPage /> },
      { path: "/home", element: <HomeLoggedInPage /> },

      { path: "/login", element: <LoginPage /> },

{ path: "/activities", element: <ActivityListPage /> },
      { path: "/activities/:id", element: <ActivityDetailPage /> },
      { path: "/profile", element: <ProfileDetailsPage /> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
