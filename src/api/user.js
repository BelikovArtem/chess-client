/** This class represents the user DTO. */
export default class User {
  /**
   * Creates a new user.
   * @param {number} id 
   * @param {string} username 
   * @param {bool} isDeleted 
   * @param {Date} registeredAt 
   * @param {number} gamesCount 
   * @param {number} blitzRating 
   * @param {number} rapidRating 
   * @param {number} bulletRating
   * @param {string} accessToken 
   */
  constructor(
    options
  ) {
    for (const key in options) {
      this[key] = options[key]
    }
  }
}