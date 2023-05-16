import { Router, Request, Response } from "express"
import IUser from "../Interfaces/User"
import bcrypt from "bcrypt"

import { createAccessToken, createRefreshToken} from "../Controllers/token"
import { isAuth } from "../Controllers/isauth"
import User from "../Models/User"

const router = Router()


router.post("/login", async (req: Request<IUser>, res: Response):Promise<any> => {

    try {

        const user = await User.findOne({ email: req.body.email })

        if ( !user ) {
            res.status(404).json({ message: "User not found" })
            return;
        } 


        const valid = await bcrypt.compare(req.body.password, user.password, (err, result) => {

            if ( err ) {
                console.log("Error comparing passwords: ", err)
                return;
            }

            if ( result ) {
                const accessToken = createAccessToken(user.email, user.password)
                const refreshToken = createRefreshToken(user.email, user.password)

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    path: '/refresh_token'
                })
                res.json({name: user.name, email: user.email, accessToken: accessToken})
                
                
                return;

            } else {
                res.status(401).json({ message: "Invalid credentials" })
                return;
            }
        }
        )

    } catch ( e : any ) {
        if(e.status) {
            res.status(e.status).json({ message: e.message })
            return
        }

        res.json({ message: "Internal server error" })
        return
    }
    
})


router.post("/logout", (req, res) => {
    try{
        res.clearCookie("refreshToken", { path: "/refresh_token" })
        return res.send({ message: "Logged out" })
    } catch ( e ) {
        res.json({ message: "Internal server error" })
    }
})



// Protected route for user

router.post("/protected", (req, res) => {

    try{
        var user = isAuth(req)
        res.json({ message: "You are authenticated" })
    } catch( e: any ) {
        res.status(401).json({ message: e.message })
        return
    }

})

export default router