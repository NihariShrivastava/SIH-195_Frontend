import express from "express";
import { createTicket, resolveTicket } from "../controllers/ticketController.js";

const router = express.Router();

router.post("/ticket", createTicket);                // Create ticket
router.put("/ticket/:ticketId/resolve", resolveTicket); // Resolve ticket

export default router;
