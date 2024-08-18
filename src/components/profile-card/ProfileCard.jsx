import styles from "./profileCard.module.css"

import profile from "../../assets/profile.png"
import { useAuth } from "../../context/useAuth"

const months = new Map()
  .set("01", "Jan.")
  .set("02", "Feb.")
  .set("03", "Mar.")
  .set("04", "Apr.")
  .set("05", "May")
  .set("06", "Jun.")
  .set("07", "Jul.")
  .set("08", "Aug.")
  .set("09", "Sep.")
  .set("10", "Oct.")
  .set("11", "Nov.")
  .set("12", "Dec.")

export default function ProfileCard() {
  const { user } = useAuth()

  function formatRegistrationDate(dateStr) {
    // timestamp in format yyyy-mm-dd
    const timestamp = dateStr.split("T")
    // [ "yyyy", "mm", "dd" ]
    const dateParts = timestamp[0].split("-")
    return `${months.get(dateParts[1])} ${dateParts[2]}, ${dateParts[0]}`  // mm/dd/yyyy
  }

  return (
    <div className={styles.profileCard}>
      <img src={profile} alt="avatar" />
      <div className={styles.profileInfo}>
        <h1>{user.username}</h1>
        <div className={styles.stats}>
          <h3>
            Likes <br />
            {user.likes}
          </h3>
          <h3>
            Registered at <br />{
              formatRegistrationDate(user.registeredAt)
            }
          </h3>
          <h3>
            Games count <br />
            {user.gamesCount}
          </h3>
        </div>
      </div>
    </div>
  )
}