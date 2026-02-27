const express = require("express");
const {
  createticket,
  getticket,
  getMyTickets,
  getticketid,
  deleteticket,
  getdashboardstatus,
  getTicketsByUser,
  updateTicketStatus,
} = require("../controller/ticket.controller");

const authMiddleware = require("../middleware/auth");
const router = express.Router();

// dashboard ticket
router.get("/dashboard", authMiddleware, getdashboardstatus);

// add ticket
router.post("/addticket", authMiddleware, createticket);

// get ticket
router.get("/allfiles", authMiddleware, getticket);

//get ticket by user
router.get("/user", authMiddleware, getTicketsByUser);

//get usertickets
router.get("/mytickets", authMiddleware, getMyTickets);

//status update
router.put("/status/:id", authMiddleware, updateTicketStatus);

// get ticket by id
router.get("/:id", authMiddleware, getticketid);

// delete ticket
router.delete("/:id", authMiddleware, deleteticket);
module.exports = router;
