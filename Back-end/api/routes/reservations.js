import express from 'express'
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"
import { createReservation, deleteReservation, getReservations, getReservationsByUserId, updateReservationByRoomNumberId } from '../controllers/reservation.js'

const router = express.Router()

//GET
router.get('/', verifyUser, getReservations)
//GET BY USERID
router.get('/:userId', verifyUser, getReservationsByUserId)

//CREATE 
router.post('/:roomNumberId', verifyUser, createReservation)

//PUT
router.put('/:roomNumberId', verifyUser, updateReservationByRoomNumberId)

//DELETE
router.delete('/:id', verifyUser, deleteReservation)


export default router