import mongoose from "mongoose"
const { Schema } = mongoose

const PaymentSchema = new mongoose.Schema({
    reservations:{
        type:[Object],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isPaid:{
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Payment', PaymentSchema)