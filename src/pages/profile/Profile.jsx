import { useAuth } from "../../context/useAuth"
import Button from "../../components/button/Button"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import "./Profile.css"

import { useNavigate } from "react-router-dom"

import api from "../../api/api.js"
import { useState } from "react"

export default function Profile() {
  const { user } = useAuth()

  const navigate = useNavigate()

  const [errMsg, setErrMsg] = useState("")

  function formatRegistrationDate(dateStr) {
    // timestamp in format yyyy-mm-dd
    const timestamp = dateStr.split("T")
    // [ "yyyy", "mm", "dd" ]
    const dateParts = timestamp[0].split("-")
    return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`  // mm/dd/yyyy
  }

  async function handleSignOut() {
    const isSuccess = await api.signOut()

    if (isSuccess) {
      navigate("/auth")
    } else {

    }
  }

  return (
    <section className="profile">
      <Sidebar />
      <h1>
        Username: {user.username}
      </h1>
      <h2>
        Ratings:
        <ul>
          <li>Blitz: {user.blitzRating}</li>
          <li>Bullet: {user.bulletRating}</li>
          <li>Rapid: {user.rapidRating}</li>
        </ul>
      </h2>
      <h2>
        Games count: {user.gamesCount}
      </h2>
      <h3>
        {/* Display date in format mm/dd/yyyy */}
        Registered at: {
          formatRegistrationDate(user.registeredAt)
        }
      </h3>
      <Button onClick text="Sign Out"></Button>
    </section>
  )
}