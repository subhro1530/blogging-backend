import Router, { Request, Response } from "express"
import User from "../Models/User"
import IUser from "../Interfaces/User"
import bcrypt from "bcrypt"

const router = Router()

router.post("/", async (req: Request<IUser>, res: Response): Promise<any> => {
    const { name, email, password } = req.body
    if (name && email && password) {
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
            res.status(400).json({ msg: "Not able to create user" })
        }
    }

    res.status(400).json({ msg: "Please fill all the fields" })
})

router.get("/:id", async (req: Request<IUser>, res: Response): Promise<any> => {
    try {
        const foundUser = await User.findById(req.params.id)
        if (foundUser) {
            res.status(200).json({
                msg: "User found",
                user: foundUser,
            })
            return
        }
        res.status(404).json({
            msg: "User not found",
        })
    } catch (error) {
        console.log("Error fetching user", error)
    }
})


export default router
