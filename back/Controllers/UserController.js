import User from "../Models/User.js"
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import config from "config"


class UserController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if(candidate) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({email, password: hashPassword})
            await user.save()
            res.json({message: "User was created"})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    }   

    async login(req, res) {
        console.log("login");
        try {
            const {email, password} = req.body
            console.log(req );
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: "User not found"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({message: "Invalid password"})
            }
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    }
}

export default new UserController()