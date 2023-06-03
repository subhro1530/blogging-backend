import { Router, Request, Response } from "express"
import IUser from "../Interfaces/User"
import bcrypt from "bcrypt"

import { createAccessToken, createRefreshToken } from "../Controllers/token"
import { isAuth } from "../Controllers/isauth"
import User from "../Models/User"

const router = Router()

router.post(
    "/login",
    async (req: Request<IUser>, res: Response): Promise<any> => {
        try {
            const user = await User.findOne({ email: req.body.email })

            if (!user) {
                res.status(404).json({ message: "User not found" })
                return
            }

            await bcrypt.compare(
                req.body.password,
                user.password,
                async (err, result) => {
                    if (err) {
                        console.log("Error comparing passwords: ", err)
                        return
                    }

                    if (result) {
                        const accessToken = createAccessToken(
                            user.email,
                            user.password
                        )
                        const refreshToken = createRefreshToken(
                            user.email,
                            user.password
                        )

                        return res
                            .cookie("refreshToken", accessToken, {
                                expires: new Date(Date.now() + 20000),
                                httpOnly: true,
                            })
                            .status(200)
                            .json({
                                name: user.name,
                                email: user.email,
                                accessToken: accessToken,
                                id: user._id
                            })
                    } else {
                        res.status(401).json({ message: "Invalid credentials" })
                        return
                    }
                }
            )
        } catch (e: any) {
            if (e.status) {
                res.status(e.status).json({ message: e.message })
                return
            }

            res.json({ message: "Internal server error" })
            return
        }
    }
)

// router.delete("/logout", (req, res) => {
//     try{
//         res.clearCookie("refreshToken", { path: "/refresh_token" })
//         return res.send({ message: "Logged out" })
//     } catch ( e ) {
//         res.json({ message: "Internal server error" })
//     }
// })

// Protected route for user

router.post("/protected", (req, res) => {
    try {
        var useremail = isAuth(req)
        res.json({ message: "You are authenticated" })
    } catch (e: any) {
        res.status(401).json({ message: e.message })
        return
    }
})

export default router
