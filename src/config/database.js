import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export const checkDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection()

    console.log('Database connected successfully')

    connection.release()
  } catch (error) {
    console.error('Database connection failed:', error.message)

    throw error
  }
}

export default pool