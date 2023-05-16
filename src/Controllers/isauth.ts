import jwt from "jsonwebtoken"
require("dotenv").config()

const isAuth = ( req: any): any => {

    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(' ')[1]

    if (! token ) throw new Error("You need to login first")
    try {
        var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
        return decoded
    } catch ( e ) {
        throw new Error("You need to login first")
    }

}


export { isAuth }