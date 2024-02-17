import { Router } from "express";
import ticketCtrl from "../controllers/ticketCtrl.js";
import userExtractor from "../middleware/userExtractor.js";
const router = Router();


router.route("/Find").get(userExtractor , ticketCtrl.getOneTicketUser );
router.route("/FindP").get(userExtractor ,ticketCtrl.getOneTicketUserPopulate );
router.route("/Exit").post(ticketCtrl.updateTicket );


router.route("/")
    .get(ticketCtrl.getTickets)
    .post(ticketCtrl.newTicket)

router.route("/:idTicket")
    .put(ticketCtrl.updateTicket)
    .get(ticketCtrl.getOneTicket)
    .delete(ticketCtrl.deleteTicket)



export default router;
