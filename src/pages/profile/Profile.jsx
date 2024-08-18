import { useAuth } from "../../context/useAuth"
import Button from "../../components/button/Button.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import styles from "./profile.module.css"
import ProfileCard from "../../components/profile-card/ProfileCard.jsx"

import { useNavigate } from "react-router-dom"

import api from "../../api/api.js"
import { useState } from "react"

export default function Profile() {
  const { user } = useAuth()

  const navigate = useNavigate()

  const [errMsg, setErrMsg] = useState("")

  async function handleSignOut() {
    const isSuccess = await api.signOut()

    if (isSuccess) {
      navigate("/auth")
    } else {
      setErrMsg("Internal server error, please try later")
    }
  }

  return (
    <div className="mainContainer">
      <Sidebar />
      <div className={styles.contentContainer}>
        <div className={styles.userInfo}>
          <ProfileCard />
          <div className={styles.options}>
            <Button text="Edit Profile" />
            <Button onClickHandler={handleSignOut} text="Sign Out" />
          </div>
        </div>
        <div className={styles.ratingsInfo}>
          <h2>Ratings</h2>
          <ul>
            <li>Blitz {user.blitzRating}</li>
            <li>Rapid {user.rapidRating}</li>
            <li>Bullet {user.bulletRating}</li>
          </ul>
        </div>
      </div>
    </div >
  )
}