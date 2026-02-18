const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const ticketroutes = require("./routes/ticket.routes");
const userroutes = require("./routes/user.routes");
app.use(express.json());
app.use(cors());

app.use("/api", ticketroutes);
app.use("/api/auth", userroutes);

module.exports = app;
