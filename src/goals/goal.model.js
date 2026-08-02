import pool from '../config/database.js'

export const findGoalsByUserId = async (userId) => {
  const [rows] = await pool.query(
    `SELECT 
      id,
      user_id,
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

export const findGoalById = async (id, userId) => {
  const [rows] = await pool.query(
    `SELECT 
      id,
      user_id,
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
    [id, userId]
  )

  return rows[0]
}

export const createGoal = async ({
  userId,
  name,
  description,
  startDate,
  targetDate
}) => {
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

  return findGoalById(result.insertId, userId)
}

export const updateGoal = async (
  id,
  userId,
  {
    name,
    description,
    startDate,
    targetDate,
    completed
  }
) => {
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
      id,
      userId
    ]
  )

  if (result.affectedRows === 0) {
    return null
  }

  return findGoalById(id, userId)
}

export const deleteGoal = async (id, userId) => {
  const [result] = await pool.query(
    `UPDATE goals
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = ?
      AND user_id = ?
      AND deleted_at IS NULL`,
    [id, userId]
  )

  return result.affectedRows > 0
}