import express from 'express'
import { verifyUser } from '../utils/verifyToken.js'
import { getPayment, createPayment } from '../controllers/payment.js'

const router = express.Router()

//GET
router.get('/:userId', verifyUser, getPayment)

//POST
router.post('/paid', verifyUser, createPayment)

export default router