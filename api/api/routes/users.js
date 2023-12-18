import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// router.get('/checkauthentication', verifyToken, (req, res, next)=>{
//     res.send("Hello user, you are logged in.")
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next)=>{
//     res.send("Hello user, you're logged in and you can delete your account.")
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next)=>{
//     res.send("Hello admin, you're logged in and you can delete all accounts.")
// })

//UPDATE
router.put('/:id', verifyUser, updateUser)

//DELETE
router.delete('/:id', verifyUser, deleteUser)

//GET
router.get('/:id', verifyAdmin, getUser)

//GET ALL
router.get('/', getUsers)

export default router