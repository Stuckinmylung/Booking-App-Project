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
        const reservation = await Reservation.findOne({ 'roomNumberId': req.params.roomNumberId })
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

export const getReservationsByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const reservations = await Reservation.find({ 'userId': userId });
      res.status(200).json(reservations);
    } catch (error) {
      next(error);
    }
  };
  

export const deleteReservation = async (req, res, next)=>{
    try {
        const reservation = await Reservation.findById(req.params.id)
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

export const deleteReservationAfterPay = async (req, res, next)=>{
    try{
        await Reservation.findByIdAndDelete(req.params.id)
        res.status(200).json('Reservation has been deleted.')
    } catch (err) {
        next(err)
    }
}