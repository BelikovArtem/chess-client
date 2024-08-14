import api from "../api/api.js"

import {
  useState,
  useEffect,
  useContext,
  createContext,
} from "react"

import { useNavigate, Outlet } from "react-router-dom"

const UserContext = createContext()

export function UserProvider() {
  const navigate = useNavigate()

  const [user, setUser] = useState(UserContext)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const fetchMe = async () => {
      const accessToken = await api.refreshTokens()
      if (
        accessToken === 'Unauthorized' ||
        accessToken === 'Internal server error'
      ) {
        navigate("/auth")
      } else {
        const updatedUser = await api.getUserInfoById(accessToken)
        if (typeof updatedUser === "string") {
          navigate("/auth")
        } else {
          setUser(updatedUser)
          setIsReady(true)
        }
      }
    }
    fetchMe()
  }, [])

  return (
    <UserContext.Provider value={{ user: user, setUser }}>
      {
        isReady ? (
          <Outlet />
        ) : null
      }
    </UserContext.Provider>
  )
}

export const useAuth = () => useContext(UserContext)