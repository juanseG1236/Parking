import { Router } from "express";
import userCtrl from "../controllers/userCtrl.js";
import userExtractor from "../middleware/userExtractor.js";
const router = Router();


router.route("/")
    .get(userCtrl.getUsers)
    .post(userCtrl.newUser)
    .delete(userCtrl.deleteUser)

router.route("/:id")
    .put(userCtrl.updateUser)



router.route("/Data")
    .get(userExtractor , userCtrl.getOneUser)

router.route("/Validate")
.post(userCtrl.validateUser)

export default router;
