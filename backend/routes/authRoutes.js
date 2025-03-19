import express from 'express'
import { getUsers, login, registerUser } from '../controllers/authController.js'

const router = express.Router()
router.post("/register",registerUser)

router.post("/login",login)
router.get("/users",getUsers)

export default router