import { User } from "../models/user.model.js";
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
dotenv.config()
const SECRET_KEY = process.env.JWT_SECRET
export const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const existingUser = await User.findOne({ username })
        if (existingUser) return res.status(400).json({ message: "User Already exists" })
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, password: hashedPassword, role })
        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }

}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ message: "Invalid username or password" })
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return res.status(400).json({ message: "Invalid username" })
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '3d' })
        res.json({ token, user })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}