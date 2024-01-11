import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './api/routes/auth.js'
import usersRoute from './api/routes/users.js'
import hotelsRoute from './api/routes/hotels.js'
import roomsRoute from './api/routes/rooms.js'
import reservationsRoute from './api/routes/reservations.js'
import paymentsRoute from './api/routes/payments.js'
import reviewsRoute from './api/routes/reviews.js'
import attractionsRoute from './api/routes/attractions.js'
import cookieParser from 'cookie-parser'
const app = express()
dotenv.config()

// change to localhost process.env.MONGO => mongodb//localhost:27017/db
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB.')
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on('disconnected', ()=>{
    console.log('mongoDB disconnected')
})

//middleware
app.use(cookieParser())
app.use(express.json())

app.use('/api/hotels', hotelsRoute);
app.use('/api/auth', authRoute);
app.use('/api/payments', paymentsRoute)
app.use('/api/users', usersRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/reservations', reservationsRoute);
app.use('/api/reviews', reviewsRoute)
app.use('/api/attractions', attractionsRoute)

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Something went wrong'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(8800, ()=>{
    connect()
    console.log('Connected to backend.')
})