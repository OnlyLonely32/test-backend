import express from "express"
import mongoose from "mongoose"
import router from "./Routers/index.js"
import fileUpload from "express-fileupload"

 
const PORT = 5000
const DB_URL = `mongodb+srv://user:user@cluster0.9ynqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)




async function startApp () {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`server start on ${PORT} port`))
    } catch (e) {
        console.log(e)
    }
}

startApp()