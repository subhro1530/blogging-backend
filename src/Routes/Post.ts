import { Router, Request, Response } from "express"
import { isAuth } from "../Controllers/isauth"
import Post from "../Models/Post"

const router = Router()

router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
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

router.get("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const post = await Post.findById(id).exec()
        if (post) {
            return res.status(200).json(post)
        }
    } catch (err: any) {
        if (err.status) {
            return res.status(404).json({ msg: err.message })
        }
        return res.status(404).json({ msg: err.message })
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
        const { title, body, userName} = req.body

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
                res.status(201).json({ msg: "Post created successfully", result })
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
    try {
        if (req.params.id) {
            const post = await Post.findByIdAndDelete(req.params.id)
            if (post) {
                res.status(200).json({ msg: "Post deleted successfully" })
                return
            }
            res.status(404).json({ msg: "Post not found" })
            return
        }
        res.status(400).json({ msg: "Please provide an id" })
    } catch (error: any) {
        if (error.statusCode) {
            res.status(error.status).json({ msg: error.message })
        }
        res.json({ msg: error.message })
    }
})

router.put("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        if (req.params.id) {
            const post = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            )
            if (post) {
                res.status(200).json({ msg: "Post updated successfully" })
                return
            }
            res.status(404).json({ msg: "Post not found" })
            return
        }
    } catch (error: any) {
        if (error.statusCode) {
            res.status(error.status).json({ msg: error.message })
        }
        res.json({ msg: error.message })
    }
})

export default router
