import pool from '../config/database.js'

const findUserIdByUsername = async (username) => {
  const [rows] = await pool.query(
    'SELECT id FROM users WHERE username = ?',
    [username]
  )

  return rows[0]?.id
}

export const findGoalsByUsername = async (username) => {
  const userId = await findUserIdByUsername(username)

  if (!userId) {
    return null
  }

  const [rows] = await pool.query(
    `SELECT
      id,
      name,
      description,
      start_date,
      target_date,
      completed,
      created_at,
      updated_at
    FROM goals
    WHERE user_id = ?
      AND deleted_at IS NULL
    ORDER BY target_date ASC`,
    [userId]
  )

  return rows
}

export const findGoalById = async (username, goalId) => {
  const userId = await findUserIdByUsername(username)

  if (!userId) {
    return null
  }

  const [rows] = await pool.query(
    `SELECT
      id,
      name,
      description,
      start_date,
      target_date,
      completed,
      created_at,
      updated_at
    FROM goals
    WHERE id = ?
      AND user_id = ?
      AND deleted_at IS NULL`,
    [goalId, userId]
  )

  return rows[0]
}

export const createGoal = async (
  username,
  {
    name,
    description,
    startDate,
    targetDate
  }
) => {
  const userId = await findUserIdByUsername(username)

  if (!userId) {
    return null
  }

  const [result] = await pool.query(
    `INSERT INTO goals (
      user_id,
      name,
      description,
      start_date,
      target_date
    )
    VALUES (?, ?, ?, ?, ?)`,
    [
      userId,
      name,
      description || null,
      startDate,
      targetDate
    ]
  )

  return findGoalById(username, result.insertId)
}

export const updateGoal = async (
  username,
  goalId,
  {
    name,
    description,
    startDate,
    targetDate,
    completed
  }
) => {
  const userId = await findUserIdByUsername(username)

  if (!userId) {
    return null
  }

  const [result] = await pool.query(
    `UPDATE goals
    SET
      name = ?,
      description = ?,
      start_date = ?,
      target_date = ?,
      completed = ?
    WHERE id = ?
      AND user_id = ?
      AND deleted_at IS NULL`,
    [
      name,
      description || null,
      startDate,
      targetDate,
      completed,
      goalId,
      userId
    ]
  )

  if (result.affectedRows === 0) {
    return null
  }

  return findGoalById(username, goalId)
}

export const deleteGoal = async (username, goalId) => {
  const userId = await findUserIdByUsername(username)

  if (!userId) {
    return false
  }

  const [result] = await pool.query(
    `UPDATE goals
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = ?
      AND user_id = ?
      AND deleted_at IS NULL`,
    [goalId, userId]
  )

  return result.affectedRows > 0
}