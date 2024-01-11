import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"

export const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id}
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
}

export const updateRoom = async (req, res, next)=>{
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedRoom)
    } catch(err) {
        next(err)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
      const updatedRoom = await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
}

export const getRoom = async (req, res, next)=>{
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch(err) {
        next(err)
    }
}

export const getRooms = async (req, res, next)=>{
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch(err) {
        next(err)
    }
}

export const getRoomByRoomNumberId = async (req, res, next)=>{
    const roomNumberId = req.params.roomNumberId
    try {
        const room = await Room.findOne({ 'roomNumbers._id': roomNumberId })
        res.status(200).json(room)
        return room;
    } catch (err) {
        next(err)
    }
}

export const getNumberByRoomNumberId = async (req, res) => {
    try {
      const roomNumberId = req.params.roomnumberid;
  
      const room = await Room.findOne({ 'roomNumbers._id': roomNumberId });
  
      if (!room) {
        return res.status(404).json({ message: 'Room not found for the given room number.' });
      }
  
      const roomNumber = room.roomNumbers.find(number => number._id.toString() === roomNumberId);
  
      if (!roomNumber) {
        return res.status(404).json({ message: 'Room number not found.' });
      }
      res.json(roomNumber);
      return roomNumber
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
            $pull: { rooms: req.params.id },
        });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        next(err);
    }
};