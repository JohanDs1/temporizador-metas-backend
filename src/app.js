import express from 'express'
import cors from 'cors'
import pool from './config/database.js'

import userRoutes from './users/user.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users',userRoutes)


export default app