import { Router } from "express";
import reserveCtrl from "../controllers/reserveCtrl.js";
import userExtractor from '../middleware/userExtractor.js'

const router = Router();

router.route("/Find").get(userExtractor , reserveCtrl.getOneReserveUser );


router.route("/")
    .get(userExtractor, reserveCtrl.getReserves)
    .post(reserveCtrl.newReserve)
, 
router.route("/:idReserve")
    .put(reserveCtrl.updateReserve)
    .delete(reserveCtrl.deleteReserve)

export default router;
