import express from "express"
import mongoose from "mongoose"
import router from "./Routers/index.js"
import fileUpload from "express-fileupload"
import cors from "cors"
import config from "config"
 
const PORT = config.get("serverPort")
const DB_URL = config.get("dbUrl")

const app = express()

app.use(cors())
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