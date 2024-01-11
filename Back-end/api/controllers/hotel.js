import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"
import diacritics from 'diacritics'

export const createHotel = async (req, res, next)=>{
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch(err) {
        next(err)
    }
}

export const updateHotel = async (req, res, next)=>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch(err) {
        next(err)
    }
}

export const getHotel = async (req, res, next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch(err) {
        next(err)
    }
}

export const getHotelsByConditions = async (req, res, next)=>{
    const dates =  req.query.dates.split(',').map(String)
    const options = req.query.options.split(',').map(Number)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const date = new Date(start.getTime());
        const dates = [];
    
        while (date <= end) {
          dates.push({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
          });
          date.setDate(date.getDate() + 1);
        }
    
        return dates;
      };
    const alldates = getDatesInRange(dates[0], dates[dates.length-1])

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => {
          const dateObj = new Date(date);
          const dateWithoutTime = {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            day: dateObj.getDate(),
          };
    
          return alldates.some(
            (d) =>
              d.year === dateWithoutTime.year &&
              d.month === dateWithoutTime.month &&
              d.day === dateWithoutTime.day
          );
        });
    
        return !isFound;
      };

    const normalizeCity = (city)=>{
        city = diacritics.remove(city)
        const words = city.split(' ')
        const formattedWords = words.map((word) => {
            const lowercaseWord = word.toLowerCase()
            return lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1)
        })
        const formattedCity = formattedWords.join(' ')
        return formattedCity
    }
    try {
        const hotels = await Hotel.find({ 
            'city': normalizeCity(req.query.city),
            'cheapestPrice': { $gte: req.query.min, $lte: req.query.max },
        })
        const validHotels = []
        for (const hotel of hotels) {
            const validRooms = []
            if (Array.isArray(hotel.rooms)){
                for (const roomId of hotel.rooms) {
                    const room = await Room.findById(roomId)
                    if (room && Array.isArray(room.roomNumbers)){
                        const validRoomNumbers = room.roomNumbers.filter((roomNumber) => isAvailable(roomNumber))
                        const amountOfPeople = options[0] + Math.ceil(options[1]/2)
                        if (validRoomNumbers.length >= options[2] && room.maxPeople >= amountOfPeople) {
                            validRooms.push(room.toObject())
                        }
                    }
                }
                if(validRooms.length > 0){
                    validHotels.push({
                        hotel: hotel.toObject()
                    })
                }
            }
        }
        res.status(200).json(validHotels) 
    } catch (err) {
        next(err);
    }
}

export const getHotels = async (req, res, next)=>{
    const {min, max, ...others} = req.query
    try {
        const hotels = await Hotel.find(
            {...others, cheapestPrice: {$gt:min | 1, $lt:max || 999}}
        ).limit(req.query.limit);
        res.status(200).json(hotels)
    } catch(err) {
        next(err)
    }
}

export const countByCity = async (req, res, next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:city})
        }));
        res.status(200).json(list)
    } catch(err) {
        next(err)
    }
}

export const countByType = async (req, res, next)=>{
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})
        
        res.status(200).json([
            {type:"hotel", count: hotelCount},
            {type:"apartment", count: apartmentCount},
            {type:"resort", count: resortCount},
            {type:"villa", count: villaCount},
            {type:"cabin", count: cabinCount}
        ]);
    } catch(err) {
        next(err)
    }
}

export const deleteHotel = async (req, res, next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    } catch(err) {
        next(err)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch(err) {
        next(err)
    }
}

export const getHotelByRoomNumberId = async (req, res) => {
    try {
        const roomNumberId = req.params.roomNumberId;
        const room = await Room.findOne({ 'roomNumbers._id': roomNumberId });
        if (!room) {
            return res.status(404).json({ message: 'Room not found with the given room number ID.' });
        }
        const hotel = await Hotel.findOne({ rooms: room.id });
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found for the given room.' });
        }
        res.status(200).json(hotel);
    } catch (err) {
        next(err)
    }
};
  