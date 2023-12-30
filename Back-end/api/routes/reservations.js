import express from 'express'
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"
import { createReservation, deleteReservation, getReservations, getReservationsByUserId } from '../controllers/reservation.js'

const router = express.Router()

//GET
router.get('/', verifyUser, getReservations)
//GET BY USERID
router.get('/:userId', verifyUser, getReservationsByUserId)

//CREATE 
router.post('/:id', verifyUser, createReservation)

//DELETE
router.delete('/:id', verifyUser, deleteReservation)


export default router