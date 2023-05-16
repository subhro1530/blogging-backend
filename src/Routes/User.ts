import Router, { Request, Response } from "express"
import User from "../Models/User"
import IUser from "../Interfaces/User"
import bcrypt from "bcrypt"

const router = Router()

router.post("/", async (req: Request<IUser>, res: Response): Promise<any> => {
    const { name, email, password } = req.body

    try {
        const foundUser = await User.findOne({ email: email })

        if (foundUser) {
            res.status(400).json({
                msg: "user already exists.",
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        })

        newUser.save()

        res.status(201).json({
            msg: "User created successfully! ",
        })
        return
    } catch (error) {
        res.status(400).json({msg: "Not able to create user"})
    }
})

export default router
