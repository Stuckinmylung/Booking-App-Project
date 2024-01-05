import Hotel from "../models/Review.js"
import Review from "../models/Review.js"
import { createError } from "../utils/error.js"

export const createReview = async (req, res, next)=>{
    const newReview = new Review(req.body)
    newReview.hotelId = req.params.hotelId
    try {
        const savedReview = await newReview.save()
        res.status(200).json(savedReview)
    } catch (err) {
        next(err)
    }
}

export const deleteReview = async (req, res, next)=>{
    try {
        await Review.findByIdAndDelete(req.params.reviewId)
        res.status(200).json('Review has been deleted.')
    } catch (err){
        next(err)
    }
}

export const getReviews = async (req, res, next)=>{
    try {
        const reviews = await Review.find({ 'hotelId': req.params.hotelId })
        res.status(200).json(reviews)
    } catch (err){
        next(err)
    }
}