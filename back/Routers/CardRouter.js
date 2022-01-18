import { Router } from "express";
import CardController from "../Controllers/CardController.js";

const router = new Router()

router.post('/', CardController.create)
router.get('/:id', CardController.getFromFolder)
router.delete('/:id', CardController.delete)

export default router