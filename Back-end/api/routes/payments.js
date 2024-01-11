import express from 'express'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'
import { getPayment, createPayment, getPayments, getPaymentsByDate } from '../controllers/payment.js'

const router = express.Router()

//GET
router.get('/:userId', verifyUser, getPayment)
router.get('/', verifyUser, getPayments)
router.get('/date/:date', verifyUser, getPaymentsByDate)

//POST
router.post('/paid', verifyUser, createPayment)

export default router