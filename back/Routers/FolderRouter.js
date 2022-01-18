import { Router } from "express";
import FolderController from "../Controllers/FolderController.js";

const router = new Router()

router.post('/', FolderController.create)
router.get('/', FolderController.getAll)
router.delete('/:id', FolderController.delete)

export default router