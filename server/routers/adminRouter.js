import { Router } from "express";
const router = Router()
import { userAuth as auth, adminauth } from "../middlewares/authMiddleware.js";
import { getData, sendauth, getnewApps, acceptApplcation } from "../Controllers/adminController.js"
import { getApps, approveApplcation, cancelApplication } from "../Controllers/adminController.js"
import { getSlots, getApprovedlist, slotconfirm, addSlot } from "../Controllers/adminController.js "


router.get("/getDatas", auth, getData)
router.get("/auth", adminauth, sendauth)
router.get("/getnewApp", adminauth, getnewApps)
router.get("/getApps", adminauth, getApps)
router.get('/acceptApplication/:id', adminauth, acceptApplcation)
router.put('/approveApplication/:id', adminauth, approveApplcation)
router.put('/cancelApplication/:id', adminauth, cancelApplication)
router.get("/getSlots", adminauth, getSlots)
router.get("/getApprovedlist", adminauth, getApprovedlist)
router.put("/slotconfirm", adminauth, slotconfirm)

router.put("/addSlot", adminauth, addSlot)
export default router