const { Router } = require('express')
// const config = require("config")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const jwtSecret = "abdulaziz kholbaev funder dao"

router.post(
    "/register",
    [
        check('email', "Incorrect Email").isEmail(),
        check('password', 'Min 6 character').isLength({min:6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Validatedan ota olamadi "
            })
        }
        const {email, password} = req.body
        const candidate = await User.findOne({email: email})
        if (candidate) {
           return  res.status(400).json({message: "Bunday email lik user bor"})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        console.log(hashedPassword)
        const user = new User({email, password: hashedPassword})
        await user.save()

        res.status(201).json({message:"Created user"})
    } catch (e) {
        res.status(401).json({message: "Catchga tushib qoldi error bervotti"})
    }
})

router.post("/login",
    [
        check('email', 'Togri email kiriting').normalizeEmail().isEmail(),
        check('password', 'Parolni kiriting').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Kiritilgan malumotlarda xatolik bor sistemaga kirishda"
            })
        }
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user){
            return res.status(404).json({
                message: "Sistemada bunday user yoq ...."
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return  res.status(401).json({
                message: 'Password da xatolik bor qayta urinib koring'
            })
        }
        const token = jwt.sign(
            {userId: user.id},
            jwtSecret,
            {expiresIn:'1h'}
            )
        res.json({token, userId: user.id})
    } catch (e) {
        console.log("Error", e.message)
        res.status(500).json({message: "Chto to poshlo ne tak yana bir urinib koring"})
    }
})

module.exports = router;