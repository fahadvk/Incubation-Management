import { Router } from "express";
const router = Router()
import { userAuth as auth } from "../middlewares/authMiddleware.js";
import { getData } from "../Controllers/adminController.js"


router.get("/getDatas", auth, getData)
export default router