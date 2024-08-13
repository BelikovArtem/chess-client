import { useAuth } from "../../context/useAuth"
import "./Profile.css"

export default function Profile() {
  const { user } = useAuth()

  function formatRegistrationDate(dateStr) {
    // timestamp in format yyyy-mm-dd
    const timestamp = dateStr.split("T")
    // [ "yyyy", "mm", "dd" ]
    const dateParts = timestamp[0].split("-")
    return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`  // mm/dd/yyyy
  }

  return (
    <section>
      <h1>
        Username: {user.username}
      </h1>
      <h2>
        Ratings:
        <ul>
          <li>Blitz: {user.blitzRating}</li>
          <li>Rapid: {user.rapidRating}</li>
          <li>Bullet: {user.bulletRating}</li>
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
    </section>
  )
}