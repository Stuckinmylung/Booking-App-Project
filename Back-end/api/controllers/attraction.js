import Attraction from "../models/Attraction.js";

export const createAttraction = async (req, res, next)=>{ 
    const newAttraction = new Attraction(req.body)
    try {
        const savedAttraction = await newAttraction.save()
        res.status(200).json(savedAttraction)
    } catch (err) {
        next(err)
    }
}

export const getAttractions = async (req, res, next)=>{
    try {
        const attractions = await Attraction.find({ 'city': req.query.city })
        res.status(200).json(attractions)
    } catch (err) {
        next(err)
    }
}

export const deleteAttraction = async (req, res, next)=>{
    try {
        await Attraction.findByIdAndDelete(req.params.id)
        res.status(200).json('Attraction has been deleted.')
    } catch (err) {
        next(err)
    }
}