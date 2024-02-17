import { Router } from "express";
import puestoCtrl from "../controllers/puestoCtrl.js";
const router = Router();


router.route("/")
    .get(puestoCtrl.getPuestos)
    .post(puestoCtrl.newPuesto)

router.route("/:nPuesto")
    .put(puestoCtrl.updatePuesto)
    .get(puestoCtrl.getOnePuesto)
    .delete(puestoCtrl.deletePuesto)

    
      


export default router;
