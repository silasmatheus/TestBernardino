import express from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import authConfig from "../../config/config.json" assert {type: 'json'}


const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

router.post('/register', async (req, res) => {
    try {

        const { email } = req.body;

        if(await User.findOne({email}))
            return res.status(400).send({error: "Email já existe"})

        const user = await User.create(req.body)
        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id})
        })

    } catch ( err) {

        return res.status(400).send({error: err})

    }
})

router.post("/authenticate", async (req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({ email}).select('+password')
    
    if(!user)
        return res.status(400).send({error: 'Invalid user'})

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Invalid password'})

    user.password = undefined;

    return res.send({
        user,
        token: generateToken({ id: user.id})
    })
})

export default (app) => app.use('/auth', router)