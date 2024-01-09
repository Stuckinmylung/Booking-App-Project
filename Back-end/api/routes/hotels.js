import express from 'express'
import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js'
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelByRoomNumberId, getHotelRooms, getHotels, getHotelsByConditions, updateHotel } from '../controllers/hotel.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

//CREATE
router.post('/', verifyAdmin, createHotel)

//UPDATE
router.put('/:id', verifyAdmin, updateHotel)

//DELETE
router.delete('/:id', verifyAdmin, deleteHotel)

//GET
router.get('/find/:id', getHotel)

//GET ALL
router.get('/', getHotels)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id', getHotelRooms)
router.get('/hotelByRoomNumberId/:roomNumberId', getHotelByRoomNumberId);
router.get('/search', getHotelsByConditions)


export default router