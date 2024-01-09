import express from 'express'
import { 
    createRoom, deleteRoom, getNumberByRoomNumberId, getRoom, getRoomByRoomNumberId, getRooms, updateRoom, updateRoomAvailability } 
    from "../controllers/room.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

//CREATE 
router.post('/:hotelId', verifyAdmin, createRoom)

//UPDATE
router.put('/:id', verifyAdmin, updateRoom)
router.put('/availability/:id', updateRoomAvailability)

//DELETE
router.delete('/:id', verifyAdmin, deleteRoom)

//GET
router.get('/:id', getRoom)
// GET ROOM BY ROOMNUMBERID
router.get('/find/:roomNumberId', verifyUser, getRoomByRoomNumberId)
//
router.get('/findByRoomNumberId/:roomnumberid', verifyUser, getNumberByRoomNumberId)

//GET ALL
router.get('/', getRooms)

export default router