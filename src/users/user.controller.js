import {
  findUserByUsername,
  createUser
} from './user.model.js'

export const createOrGetUser = async (req, res) => {
  try {
    const { username } = req.body

    if (!username) {
      return res.status(400).json({
        message: 'Username is required'
      })
    }

    const existingUser = await findUserByUsername(username)

    if (existingUser) {
      return res.status(200).json(existingUser)
    }

    const user = await createUser(username)

    return res.status(201).json(user)
  } catch (error) {
    console.error('Error creating or getting user:', error)

    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params

    const user = await findUserByUsername(username)

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error('Error getting user:', error)

    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}