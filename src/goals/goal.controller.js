import {
  findGoalsByUserId,
  findGoalById,
  createGoal,
  updateGoal,
  deleteGoal
} from './goal.model.js'

export const getGoals = async (req, res) => {
  try {
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({
        message: 'User ID is required'
      })
    }

    const goals = await findGoalsByUserId(userId)

    return res.status(200).json(goals)
  } catch (error) {
    console.error('Error getting goals:', error)

    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const getGoalById = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({
        message: 'User ID is required'
      })
    }

    const goal = await findGoalById(id, userId)

    if (!goal) {
      return res.status(404).json({
        message: 'Goal not found'
      })
    }

    return res.status(200).json(goal)
  } catch (error) {
    console.error('Error getting goal:', error)

    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const createNewGoal = async (req, res) => {
  try {
    const {
      userId,
      name,
      description,
      startDate,
      targetDate
    } = req.body

    if (!userId || !name || !startDate || !targetDate) {
      return res.status(400).json({
        message: 'User ID, name, start date and target date are required'
      })
    }

    const goal = await createGoal({
      userId,
      name,
      description,
      startDate,
      targetDate
    })

    return res.status(201).json(goal)
  } catch (error) {
    console.error('Error creating goal:', error)

    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const updateExistingGoal = async (req, res) => {
  try {
    const { id } = req.params
    const {
      userId,
      name,
      description,
      startDate,
      targetDate,
      completed
    } = req.body

    if (
      !userId ||
      !name ||
      !startDate ||
      !targetDate ||
      completed === undefined
    ) {
      return res.status(400).json({
        message: 'User ID, name, start date, target date and completed are required'
      })
    }

    const goal = await updateGoal(
      id,
      userId,
      {
        name,
        description,
        startDate,
        targetDate,
        completed
      }
    )

    if (!goal) {
      return res.status(404).json({
        message: 'Goal not found'
      })
    }

    return res.status(200).json(goal)
  } catch (error) {
    console.error('Error updating goal:', error)

    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const deleteExistingGoal = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({
        message: 'User ID is required'
      })
    }

    const deleted = await deleteGoal(id, userId)

    if (!deleted) {
      return res.status(404).json({
        message: 'Goal not found'
      })
    }

    return res.status(204).send()
  } catch (error) {
    console.error('Error deleting goal:', error)

    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}