const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL || "https://e-commerce-web-application-woad.vercel.app/" ,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

const PORT = process.env.PORT || 8080


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Successfully connected to DATABASE")
        console.log("Server is running On PORT : "+PORT)
    })
})
