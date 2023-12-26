import express from 'express'
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"
import { createReservation, deleteReservation, getReservations } from '../controllers/reservation.js'

const router = express.Router()

//GET
router.get('/', verifyUser, getReservations)

//CREATE 
router.post('/:id', verifyUser, createReservation)

//DELETE
router.delete('/:id', verifyUser, deleteReservation)

export default router