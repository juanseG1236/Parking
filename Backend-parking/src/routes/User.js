import { Router } from "express";
import userCtrl from "../controllers/userCtrl.js";
import userExtractor from "../middleware/userExtractor.js";
const router = Router();


router.route("/")
    .get(userCtrl.getUsers)
    .post(userCtrl.newUser)

router.route("/:id")
    .put(userCtrl.updateUser)
    .delete(userCtrl.deleteUser)




router.route("/Data")
    .get(userExtractor , userCtrl.getOneUser)

router.route("/Validate")
.post(userCtrl.validateUser)

export default router;
