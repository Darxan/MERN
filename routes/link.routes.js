const { Router } = require('express')
const Link = require('../models/Link')
const shortid = require('shortid')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()
const baseuri = 'http://localhost:5000'
// config ishlamaganiga biz shunday yaratib oldi


router.post('/generate', authMiddleware, async (req, res) => {

    try {
        const baseUrl = baseuri
        const {from} = req.body
        const code = shortid.generate()

        const existing =  await Link.findOne({from})
        if(existing) {
            return res.json({link: existing})
        }
        console.log(req.user.userId)
        const to = baseUrl + '/t/' + code
        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save()
        res.status(201).json({link})
    } catch (e) {
        console.log("Error", e.message)
        res.status(500).json({message: "Nomalum xatolik yuz berdi qaytadan urinib koring"})
    }
})

router.get('/',authMiddleware, async (req, res) => {
    try {
    const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        console.log("Error", e.message)
        res.status(500).json({message: "Chto to poshlo ne tak yana bir urinib koring"})
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        console.log("Error", e.message)
        res.status(500).json({message: "Chto to poshlo ne tak yana bir urinib koring"})
    }
})
module.exports = router