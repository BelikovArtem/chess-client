import { Link, useLocation } from "react-router-dom"

import timer from "../../assets/timer.png"
import trophy from "../../assets/trophy.png"
import profile from "../../assets/profile.png"
import settings from "../../assets/settings.png"
import chessIcon from "../../assets/chess-icon.png"

import styles from "./sidebar.module.css"

import { useState } from "react"
import { useAuth } from "../../context/useAuth"

export default function Sidebar() {

  const { user } = useAuth()

  const location = useLocation()

  const [sidebarHidden, setSidebarHidden] = useState(true)

  function handleSidebarToggle() {
    setSidebarHidden(!sidebarHidden)
  }

  return (
    <div className={`${styles.sidebar} ${sidebarHidden ? styles.hidden : ""}`}>
      <div className={styles.logoContainer}>
        <Link to="http://localhost:3000/">
          <img src={chessIcon} alt="logo" className={styles.logo} />
          <h4>JustChess.com</h4>
        </Link>
      </div>
      <div className={styles.sidebarContainer} onClick={() => { handleSidebarToggle() }}>
        <div className={styles.sidebarToggle} />
        <div className={styles.sidebarMenu} />
      </div>
      <div className={styles.contentContainer}>
        <ul>
          <li className={
            location.pathname === "/profile" ?
              (sidebarHidden ? styles.activeHidden : styles.active)
              : ""
          }>
            <Link to="http://localhost:3000/profile">
              <img src={profile} alt="profile" />
              <h4>{user.username}</h4>
            </Link>
          </li>
          <li className={
            location.pathname === "/play" ?
              sidebarHidden ? styles.activeHidden : styles.active
              : ""
          }>
            <Link to="http://localhost:3000/play">
              <img src={timer} alt="timer" />
              <h4>Play</h4>
            </Link>
          </li>
          <li className={
            location.pathname === "/settings" ?
              sidebarHidden ? styles.activeHidden : styles.active
              : ""
          }>
            <Link to="/settings">
              <img src={settings} alt="settings" />
              <h4>Settings</h4>
            </Link>
          </li>
          <li className={
            location.pathname === "/leaderboard" ?
              sidebarHidden ? styles.activeHidden : styles.active
              : ""
          }>
            <Link to="/leaderboard">
              <img src={trophy} alt="trophy" />
              <h4>Leaderboard</h4>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}