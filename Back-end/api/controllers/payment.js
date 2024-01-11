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

export const createPayment = async (req, res, next)=>{
    try {
        const payment = new Payment(req.body)
        payment.isPaid = true
        const savedPayment = await payment.save()
        res.status(200).json(savedPayment)
    } catch (err) {
        next(err)
    }
}

export const getPayments = async (req, res, next)=>{
    try {
        const payments = await Payment.find()
        res.status(200).json(payments)
    } catch(err) {
        next(err)
    }
}

export const getPaymentsByDate = async (req, res, next)=>{
    try {
        const timestamp = req.params.date;
        const date = new Date(parseInt(timestamp) * 1000);

        const startOfDate = new Date(date)
        startOfDate.setUTCHours(0,0,0,0)
        const endOfDate = new Date(date)
        endOfDate.setUTCHours(23, 59, 59, 999)

        const foundPayment = await Payment.find({
            "createdAt": {
                $gte: startOfDate,
                $lte: endOfDate
            }
        })
        res.status(200).json(foundPayment)
    } catch (err){
        next(err)
    }
}