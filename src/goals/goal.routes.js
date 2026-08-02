import { Router } from 'express'

import {
  getGoals,
  getGoalById,
  createNewGoal,
  updateExistingGoal,
  deleteExistingGoal
} from './goal.controller.js'

const router = Router()

router.get('/', getGoals)

router.get('/:id', getGoalById)

router.post('/', createNewGoal)

router.patch('/:id', updateExistingGoal)

router.delete('/:id', deleteExistingGoal)

export default router