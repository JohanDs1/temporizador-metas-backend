import { Router } from 'express'

import {
  getGoals,
  getGoalById,
  createNewGoal,
  updateExistingGoal,
  deleteExistingGoal
} from './goal.controller.js'

const router = Router()

router.get('/:username/goals', getGoals)

router.get('/:username/goals/:id', getGoalById)

router.post('/:username/goals', createNewGoal)

router.patch('/:username/goals/:id', updateExistingGoal)

router.delete('/:username/goals/:id', deleteExistingGoal)

export default router