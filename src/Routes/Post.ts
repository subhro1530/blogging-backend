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
        const { title, body, userName } = req.body

        if (!(title || body || userName)) {
            res.json({ msg: "Please fill all the fields" })
            return
        }

        const post = await new Post({
            title: title,
            body: body,
            userEmail: userEmail,
            userName: userName,
        })

        post.save()
            .then((result) =>
                res.json({ msg: "Post created successfully", result })
            )
            .catch((err) => res.json({ msg: err.message }))
    } catch (error: any) {
        if (error.statusCode) {
            res.status(error.status).json({ msg: error.message })
        }
        res.json({ msg: error.message })
    }
})

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {

    try {}
    catch (error: any) {
        if (error.statusCode) {
            res.status(error.status).json({ msg: error.message })
        }
        res.json({ msg: error.message })
    }

})

export default router
