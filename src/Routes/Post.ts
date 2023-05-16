import {Router, Request, Response} from "express"


const router = Router()

router.post("/", isAuthenticated, async (req: Request, res: Response) => {})
