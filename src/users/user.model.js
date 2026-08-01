import pool from '../config/database.js'

export const findUserByUsername = async (username) => {
  const [rows] = await pool.query(
    'SELECT id, username, created_at, updated_at FROM users WHERE username = ?',
    [username]
  )

  return rows[0]
}

export const createUser = async (username) => {
  const [result] = await pool.query(
    'INSERT INTO users (username) VALUES (?)',
    [username]
  )

  return findUserByUsername(username)
}