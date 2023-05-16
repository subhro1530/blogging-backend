import { NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
require("dotenv").config()

const isAuth = ( req: any ): Object => {

    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(' ')[1]

    if (! token ) throw new Error("You need to login first")
    try {
        const { email } : any  = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
        return email
    } catch ( e ) {
        throw new Error("You need to login first")
    }

}


export { isAuth }