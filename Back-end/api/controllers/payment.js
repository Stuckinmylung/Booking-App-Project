import Payment from "../models/Payment.js";
import { getReservationsByUserId } from './reservation.js';
import { getRoomByRoomNumberId } from "./room.js";

export const getPayment = async (req, res, next)=>{
    try {
        const userId = req.params.userId
        const reservations = await getReservationsByUserId(req, res, next)

        const getRoomInfo = async (roomNumberId) => {
            const roomInfo = await getRoomByRoomNumberId(roomNumberId, res, next)
            if (roomInfo && typeof roomInfo === 'object'){
                return roomInfo
            } else {
                return { price:0 }
            }
        }
        
        const roomPromises = reservations.map(reservation => getRoomInfo(reservation.roomNumberId))
        const rooms = await Promise.all(roomPromises)

        const newPayment = new Payment({ userId, rooms})
        await newPayment.save();
        
        res.status(200).json(newPayment)
    } catch (err) {
        next(err)
    }
}
