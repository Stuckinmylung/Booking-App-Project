import express from 'express'
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js'
import { createAttraction, getAttractions, deleteAttraction } from '../controllers/attraction.js'

const router = express.Router()

//CREATE
router.post('/', verifyAdmin, createAttraction)

//GET
router.get('/', verifyUser, getAttractions)

//DELETE
router.delete('/:id', verifyAdmin, deleteAttraction)

export default router
