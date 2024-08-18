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

const privateRoutes = createRoutesFromElements(
  <Route id="0" element={<UserProvider />}>
    <Route id="1" path="/" element={<App />} />
    <Route id="2" path="/profile" element={<Profile />} />
  </Route>
)

const authRoute = createRoutesFromElements(
  <Route id="3" path="/auth" element={<Authorization />} />
)

const router = createBrowserRouter([...privateRoutes, ...authRoute])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RouterProvider router={router} />
)
