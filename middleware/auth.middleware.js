const jwt = require('jsonwebtoken')
const jwtSecret = "abdulaziz kholbaev funder dao"

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]

        if(!token){
           return res.status(401).json({message: "User is Unauthorized"})
        }
        const decor = jwt.verify(token, jwtSecret)
        console.log("decor", decor)
        req.user = jwt.verify(token, jwtSecret)
        next()
    } catch (e) {
        res.status(401).json({message: "User is Unauthorized"})
    }
}
// user tokeni kelganmi requestda chuni tekshirib devode qilib quser degan polya yaratib unga user id ni solib qaytaradigon middleware yaratdik oxir

