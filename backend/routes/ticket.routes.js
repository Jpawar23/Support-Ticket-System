const express = require("express");
const {
  createticket,
  getticket,
  getticketid,
  deleteticket,
} = require("../controller/ticket.controller");
const router = express.Router();

router.post("/addticket", createticket);
router.get("/allfiles", getticket);
router.get("/:id", getticketid);
router.delete("/:id", deleteticket);
module.exports = router;
