import { Router } from "express";
import vehicleCtrl from "../controllers/vehiclesCtrl.js";
import userExtractor from "../middleware/userExtractor.js";
const router = Router();


router.route("/Find").get(userExtractor, vehicleCtrl.getOneVehicleUser);


router.route("/")
    .post(userExtractor ,vehicleCtrl.newVehicle)
    .get(userExtractor ,vehicleCtrl.getVehicles)

router.route("/:plate")
    .put(vehicleCtrl.updateVehicle)
    .get(vehicleCtrl.getOneVehicle)
    .delete(vehicleCtrl.deleteVehicle)



    export default router;
