const express = require('express');
const app = express();
const cors = require("cors");
// const createticket = require('./routes/ticket.routes');
// const getticket = require('./routes/ticket.routes')
const ticketroutes = require("./routes/ticket.routes")
app.use(express.json());
app.use(cors());

app.use("/api", ticketroutes)
// app.use("/", createticket);
// app.use("/", getticket);
module.exports = app;