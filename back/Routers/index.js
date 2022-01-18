import { Router } from "express";
import cardRouter from "./CardRouter.js";
import folderRouter from "./FolderRouter.js"
import userRouter from "./UserRouter.js"

const router = new Router()

router.use('/card', cardRouter)
router.use('/folder', folderRouter)
router.use('/user', userRouter)

export default router