const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.get(':/code', async (req, res) => {
    try {
        console.log("code:", req.params.code)
        const link = await Link.findOne({code: req.params.code})
        console.log("LINK:", link)
        if(link){
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }
        res.status(404).json({message: "Not fount"})
    } catch (e) {
        console.log("Error", e.message)
        res.status(500).json({message: "Chto to poshlo ne tak yana bir urinib koring"})
    }
})



module.exports = router