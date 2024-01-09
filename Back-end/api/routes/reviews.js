import express from 'express'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'
import { createReview, getReviews, deleteReview } from '../controllers/review.js'

const router = express.Router()

//CREATE
router.post('/:hotelId', verifyUser, createReview)

//GET
router.get('/:hotelId', getReviews)

//DELETE
router.delete('/:reviewId', verifyUser, deleteReview)

export default router