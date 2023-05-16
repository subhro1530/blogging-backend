import { Router, Request, Response } from "express"
import { isAuth } from "../Controllers/isauth"
import Post from "../Models/Post"

const router = Router()

router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const posts = await Post.find()
        res.json(posts)
        return
    } catch (e: any) {
        if (e.statusCode) {
            res.status(e.status).json({ msg: e.message })
            return
        }

        res.json({ msg: e.message })
        return
    }
})

router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const userEmail = isAuth(req)
        if (userEmail === null) {
            throw new Error("You need to login first")
            return
        }
        console.log(req.body)
        const { title, body, username } = req.body

        if (!(title || body || username)) {
            res.json({ msg: "Please fill all the fields" })
            return
        }

        const post = await new Post({
            title: title,
            body: body,
            userEmail: userEmail,
            userName: username,
        })

        post.save()
        res.json({ msg: "Post created" })
        return
    } catch (error: any) {
        if (error.statusCode) {
            res.status(error.status).json({ msg: error.message })
        }
        res.json({ msg: error.message })
    }
})

export default router
