import { Router } from "express";
const router = Router()
import { userAuth as auth, adminauth } from "../middlewares/authMiddleware.js";
import { getData, sendauth, getnewApps, acceptApplcation } from "../Controllers/adminController.js"


router.get("/getDatas", auth, getData)
router.get("/auth", adminauth, sendauth)
router.get("/getnewApp", adminauth, getnewApps)
router.get('/acceptApplication/:id', adminauth, acceptApplcation)
export default router