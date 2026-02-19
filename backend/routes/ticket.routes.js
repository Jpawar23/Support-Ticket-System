const express = require("express");
const {
  createticket,
  getticket,
  getticketid,
  deleteticket,
} = require("../controller/ticket.controller");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/addticket", authMiddleware, createticket);
router.get("/allfiles", authMiddleware, getticket);
router.get("/:id", authMiddleware, getticketid);
router.delete("/:id", authMiddleware, deleteticket);
module.exports = router;
