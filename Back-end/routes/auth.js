import express from 'express'
import { login, register, logout } from '../controllers/auth.js'

const router = express.Router()
 
router.get('/logout', logout)
router.post('/register', register)
router.post('/login', login)

export default router