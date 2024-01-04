import Hotel from "../models/Hotel.js";
import Reservation from "../models/Reservation.js"
import Room from "../models/Room.js"
import { createError } from "../utils/error.js"
import { jwtDecode } from "jwt-decode";
import { getRoomByRoomNumberId } from "./room.js";

export const getReservations = async (req, res, next)=>{
    try {
        const reservations = await Reservation.find()
        res.status(200).json(reservations)
    } catch(err) {
        next(err)
    }
}

export const getReservationsByUserId = async (req, res, next)=>{
    try {
        const userId = req.params.userId
        const reservations = await Reservation.find({'userId': userId})
        const getRoomInfo = async (roomNumberId)=>{
            const roomInfo = await getRoomByRoomNumberId(roomNumberId, res, next)
            if (roomInfo && typeof roomInfo === 'object'){
                return roomInfo
            }
        }
        const roomPromises = reservations.map(reservation => getRoomInfo(reservation.roomNumberId))
        const rooms = await Promise.all(roomPromises)
        res.status(200).json(rooms)
    } catch(err) {
        next(err)
    }
}

export const createReservation = async (req, res, next)=>{
    const newReservation = new Reservation(req.body)
    newReservation.userId = jwtDecode(req.cookies.access_token).id;
    try {
        const savedReservation = await newReservation.save()
        try {
            const dates = req.body.dates.map(date => new Date(date));
            await Room.findOneAndUpdate(
                {
                  "roomNumbers._id": req.params.room,
                },
                {
                  $push: { "roomNumbers.$.unavailableDates": { $each: dates } }
                }
            );
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedReservation)
    } catch(err) {
        next(err)
    }
}

export const updateReservationByRoomNumberId = async (req, res, next)=>{
    try {
        console.log(req)
        const reservation = await Reservation.findOne({ 'roomNumberId': req.params.roomNumberId })
        console.log('Here')
        const dates = reservation.dates.map(date => new Date(date))
        await Reservation.findOneAndUpdate(
                { 'roomNumberId': req.params.roomNumberId }, 
                { $pull: { "dates": { $in: dates } } }
            )
        try {
            await Room.findOneAndUpdate(
                { 'roomNumbers._id': req.params.roomNumberId},
                { $pull: { "roomNumbers.$.unavailableDates": { $in: dates } } }
            )
        } catch (err) {
            next(err)
        }
        res.status(200).json(reservation)
    } catch (err){
        next(err)
    }
}
export const deleteReservation = async (req, res, next)=>{
    try {
        const reservation = await Reservation.findById(req.params.id)
        // const roomNumber = await Room.findOne({ 'roomNumbers._id': reservation.roomNumberId})
        try {
            const dates = reservation.dates.map(date => new Date(date))
            await Room.findOneAndUpdate(
                { "roomNumbers._id": reservation.roomNumberId },
                { $pull: { "roomNumbers.$.unavailableDates": { $in: dates } } }
            )
            await Reservation.findByIdAndDelete(req.params.id)
        } catch (err) {
            next(err)
        }
        res.status(200).json(reservation)
    } catch (err) {
        next(err)
    }
}

