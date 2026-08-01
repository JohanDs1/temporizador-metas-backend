import { Router } from 'express'

import {
  createOrGetUser,
  getUserByUsername
} from './user.controller.js'

const router = Router()

router.post('/', createOrGetUser)

router.get('/:username', getUserByUsername)

export default router