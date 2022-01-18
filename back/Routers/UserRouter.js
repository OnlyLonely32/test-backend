import { Router } from "express";
import UserController from "../Controllers/UserController.js";

const router = new Router()

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)

export default router