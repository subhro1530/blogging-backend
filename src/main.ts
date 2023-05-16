import express from "express"
import userRoute from "./Routes/User"
import authRoute from "./Routes/Auth"
import db from "./config/db"
import cors from "cors"

const app = express()

const PORT = 4000
db()


app.use(cors())
app.use(express.json())


app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)

app.listen(PORT)

