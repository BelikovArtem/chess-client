/** This class describes the interactions with the API.  */
class Api {
  /** This constructor initializes the server url constant. */
  constructor() {
    this.serverUrl = "http://localhost:3501"
  }

  /**
   * This function tries to update refresh and access tokens.
   * It only will succeed if the refresh token is valid and
   * is stored in a http-only cookie.
   * @returns {Promise<string>} 
   */
  async refreshTokens() {
    try {
      const res = await fetch(`${this.serverUrl}/auth/refresh`, {
        method: "GET",
        credentials: "include"
      })
      if (!res.ok) {
        return "Unauthorized"
      }

      const accessToken = res.text()
      return accessToken
    } catch {
      return "Internal server error"
    }
  }

  /**
   * This function fetches the user data by id, encoded in a
   * specified access token. It passes access token through an
   * Authorization header. It will return an User object if success or 
   * a string error. 
   * @param {string} accessToken 
   * @returns {Promise<User | string>}
   */
  async getUserInfoById(accessToken) {
    try {
      const res = await fetch(`${this.serverUrl}/user/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": "Bearer " + accessToken
        }
      })
      if (!res.ok) {
        return "Unauthorized"
      }

      const user = await res.json()
      user.accessToken = accessToken
      return user
    } catch {
      return "Internal server error"
    }
  }

  /**
   * This function sends a POST request to the server
   * to handle the registration. If the credentials are
   * correct, it will return a complete user info and will set the refresh token
   * in a http-only secure cookie. Otherwise the error string
   * will be returned. 
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<User | string>}
   */
  async signUp(username, password) {
    try {
      const res = await fetch(`${this.serverUrl}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })

      if (!res.ok) {
        return "Username taken"
      }

      const newUser = await res.json()
      return newUser
    } catch {
      return "Internal server error"
    }
  }

  /**
   * This function sends a POST request to the server
   * to invoke the sign in endpoint. If the credentials are
   * correct (the user with such data exists in the database),
   * it will return a complete user info and will set the refresh token
   * in a http-only secure cookie. Otherwise the error string
   * will be returned. 
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<User | string>}
   */
  async signIn(username, password) {
    try {
      const res = await fetch(`${this.serverUrl}/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      if (!res.ok) {
        return 'Incorrect username or password'
      }

      const user = await res.json()
      return user
    } catch {
      return "Internal server error"
    }
  }

  /**
   * This function sends a GET request to the server which leads
   * to signing out the authorized user. Will return true if signing out was
   * successfull, otherwise will return false. 
   * @returns { Promise<bool>}
   */
  async signOut() {
    try {
      const res = await fetch(`${this.serverUrl}/auth/signout`, {
        method: "GET",
        credentials: "include"
      })
      if (!res.ok) {
        return false
      }

      return true
    } catch {
      return false
    }
  }
}

const api = new Api()
export default api