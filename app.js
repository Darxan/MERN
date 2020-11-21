const express = require('express')
const mongoose = require('mongoose')


const app = express()
app.use(express.json({extended: true})) // console da kora olish uchun kelgan datani

app.use('/api/auth/', require('./routes/auth.routes'))

app.use('/api/link/', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

// const PORT = config.get('port') || 5000
const PORT = 5000
const mongoUri = "mongodb+srv://daodex:A79196727856j@cluster0.4cygi.mongodb.net/app?retryWrites=true&w=majority"

async function start() {
    try {
       await mongoose.connect(mongoUri,{
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true
       })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}....`))
    }catch (e) {
        console.log("server error", e.message)
        process.exit(1)
    }
}


start()

