import { Router } from "express";
const router = Router()
import { userAuth as auth, adminauth } from "../middlewares/authMiddleware.js";
import { getData, sendauth } from "../Controllers/adminController.js"


router.get("/getDatas", auth, getData)
router.get("/auth", adminauth, sendauth)
export default router