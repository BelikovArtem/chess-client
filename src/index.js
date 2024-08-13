import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import Profile from "./pages/profile/Profile"
import { UserProvider } from "./context/useAuth"
import Authorization from "./pages/auth/Authorization"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"

const routes = createRoutesFromElements(
  <Route element={<UserProvider />}>
    <Route path="/" element={<App />} />
    <Route path="/auth" element={<Authorization />} />
    <Route path="/profile" element={<Profile />} />
  </Route>
)

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RouterProvider router={router} />
)
