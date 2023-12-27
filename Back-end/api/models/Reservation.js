import mongoose from "mongoose";
const ReservationSchema = new mongoose.Schema(
  {
    hotelId: {
      type: String,
      required: true,
    },
    roomNumberId: {
      type: String, 
      required: true
    },
    userId: {
      type: String,
      required: false,
    },
    dates: {
      type: [Date],
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", ReservationSchema);