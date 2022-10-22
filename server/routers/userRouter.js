import express, { Router } from "express";
import { userAuth as auth } from "../middlewares/authMiddleware.js";
const router = Router()
import { doSignup, doLogin } from "../Controllers/authController.js"
import { getHome, getStates, newApplication, getUserApplications } from "../Controllers/userController.js"

router.post("/register", doSignup)

router.post("/login", doLogin)
router.post("/", auth, getHome)
router.get("/getStates", auth, getStates)
router.post("/newApplication", auth, newApplication)
router.get("/getuserApplications", auth, getUserApplications)

export default router;