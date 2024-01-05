import mongoose from "mongoose";
const { Schema } = mongoose

const ReviewSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    hotelId:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    message:{
        type: String,
        required: true
    }},
    { timestamps: true}
)

export default mongoose.model('Review', ReviewSchema)