import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SavedVenuesProvider } from "./context/SavedVenuesContext.jsx";

import NavBar from "./components/NavBar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
      { path: "/login", element: <LoginPage /> },
      { path: "/activities", element: <ActivityListPage /> },
      { path: "/activities/:id", element: <ActivityDetailPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/home", element: <HomeLoggedInPage /> },
          { path: "/profile", element: <ProfileDetailsPage /> },
          { path: "/admin", element: <AdminPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SavedVenuesProvider>
      <RouterProvider router={router} />
    </SavedVenuesProvider>
  </React.StrictMode>
);
