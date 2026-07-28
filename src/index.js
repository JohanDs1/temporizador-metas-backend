import app from './app.js'
import { checkDatabaseConnection } from './config/database.js'

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    await checkDatabaseConnection()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server')

    process.exit(1)
  }
}

startServer()