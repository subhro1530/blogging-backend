import express from "express"
import userRoute from "./Routes/User"
import authRoute from "./Routes/Auth"
import postRoute from "./Routes/Post"
import db from "./config/db"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

const PORT = 4000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db()
app.use(cookieParser())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

app.use("/api/user", cors(), userRoute)
app.use("/api/", cors(), authRoute)
app.use("/api/post", postRoute)

app.listen(PORT)
