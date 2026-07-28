import express from 'express'
import cors from 'cors'
import pool from './config/database.js'

const app = express()

app.use(cors())
app.use(express.json())


export default app