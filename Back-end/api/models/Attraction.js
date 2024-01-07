import mongoose from 'mongoose'
const { Schema } = mongoose

const AttractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    }
})

export default mongoose.model('Attraction', AttractionSchema)