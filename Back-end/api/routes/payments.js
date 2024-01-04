import express from 'express'
import { verifyUser } from '../utils/verifyToken.js'
import { getPayment } from '../controllers/payment.js'

const router = express.Router()

//GET
router.get('/:userId', verifyUser, getPayment)


export default router