import express from "express"
const router = express.Router()
import authenticateUser from "../middleware/auth.js"
import rateLimiter from "express-rate-limit"

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Demasiadas peticiones por este IP. Inténtalo de nuevo dentro de 15 minutos"
})

import {register, login, updateUser} from "../controllers/authController.js"


router.route("/register").post(apiLimiter, register)
router.route("/login").post(apiLimiter, login)
router.route("/updateUser").patch(authenticateUser, updateUser)

export default router