import { Router } from "express";
import postRouter from "./PostRouter.js";

const router = new Router()

router.use('/posts', postRouter)

export default router