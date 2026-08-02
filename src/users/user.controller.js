import {
  findUserByUsername,
  createUser
} from './user.model.js'

export const createOrGetUser = async (req, res) => {
  try {
    const { username } = req.body

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Nombre de usuario es requerido'
      })
    }

    const existingUser = await findUserByUsername(username)

    if (existingUser) {
      return res.status(200).json(existingUser)
    }

    const user = await createUser(username)

    return res.status(201).json({
      success: true,
      message: "Usuario creado con éxito"
    })
  } catch (error) {
    console.error('Error al crear u obtener el usuario:', error)

    return res.status(500).json({
      success: false,
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
        success: false,
        message: 'Usuario no encontrado'
      })
    }

    return res.status(200).json({
      success: true,
      user: user
    })
  } catch (error) {
    console.error('Error al obtener usuario:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}