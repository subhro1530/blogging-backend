import jwt, { JsonWebTokenError } from "jsonwebtoken"
require("dotenv").config()

const createAccessToken = (email: String, password: String): String => {
    return jwt.sign({ email, password }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "1d",
    })
}

const createRefreshToken = (email: String, password: String): String => {
    return jwt.sign({ email, password }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "7d",
    })
}

export { createAccessToken, createRefreshToken }
