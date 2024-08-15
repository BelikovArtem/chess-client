import { Link, useLocation } from "react-router-dom"

import timer from "../../assets/timer.png"
import trophy from "../../assets/trophy.png"
import profile from "../../assets/profile.png"
import settings from "../../assets/settings.png"
import chessIcon from "../../assets/chess-icon.png"

import "./Sidebar.css"

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
    <div className={sidebarHidden ? "sidebar hidden" : "sidebar"}>
      <div className="logo-container">
        <Link to="http://localhost:3000/">
          <img src={chessIcon} alt="logo" className="logo" />
          <h4>JustChess.com</h4>
        </Link>
      </div>
      <div className="sidebar-container" onClick={() => { handleSidebarToggle() }}>
        <div className="sidebar-toggle" />
        <div className="sidebar-menu" />
      </div>
      <div className="content-container">
        <ul>
          <li className={
            location.pathname === "/profile" ?
              (sidebarHidden ? "active-hidden" : "active")
              : ""
          }>
            <Link to="http://localhost:3000/profile">
              <img src={profile} alt="profile" />
              <h4>{user.username}</h4>
            </Link>
          </li>
          <li className={
            location.pathname === "/play" ?
              sidebarHidden ? "active-hidden" : "active"
              : ""
          }>
            <Link to="http://localhost:3000/play">
              <img src={timer} alt="timer" />
              <h4>Play</h4>
            </Link>
          </li>
          <li className={
            location.pathname === "/settings" ?
              sidebarHidden ? "active-hidden" : "active"
              : ""
          }>
            <Link to="/settings">
              <img src={settings} alt="settings" />
              <h4>Settings</h4>
            </Link>
          </li>
          <li className={
            location.pathname === "/leaderboard" ?
              sidebarHidden ? "active-hidden" : "active"
              : ""
          }>
            <Link to="/leaderboard">
              <img src={trophy} alt="trophy" />
              <h4>Leaderboard</h4>
            </Link>
          </li>
        </ul>
      </div>
      {/* <div className="theme-toggle">
        Theme
      </div> */}
    </div>
  )
}