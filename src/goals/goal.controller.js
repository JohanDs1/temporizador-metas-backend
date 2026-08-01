import {
  findGoalsByUsername,
  findGoalById,
  createGoal,
  updateGoal,
  deleteGoal
} from './goal.model.js'

export const getGoals = async (req, res) => {
  try {
    const { username } = req.params

    const goals = await findGoalsByUsername(username)

    if (!goals) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

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
    const {
      username,
      id
    } = req.params

    const goal = await findGoalById(username, id)

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
    const { username } = req.params

    const {
      name,
      description,
      startDate,
      targetDate
    } = req.body

    if (!name || !startDate || !targetDate) {
      return res.status(400).json({
        message: 'Name, start date and target date are required'
      })
    }

    const goal = await createGoal(
      username,
      {
        name,
        description,
        startDate,
        targetDate
      }
    )

    if (!goal) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

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
    const {
      username,
      id
    } = req.params

    const {
      name,
      description,
      startDate,
      targetDate,
      completed
    } = req.body

    if (
      !name ||
      !startDate ||
      !targetDate ||
      completed === undefined
    ) {
      return res.status(400).json({
        message: 'Name, start date, target date and completed are required'
      })
    }

    const goal = await updateGoal(
      username,
      id,
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
    const {
      username,
      id
    } = req.params

    const deleted = await deleteGoal(username, id)

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