const Ticket = require("../models/ticket.model");

const getDashboardStats = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();

    const openTickets = await Ticket.countDocuments({ status: "open" });

    const inProgressTickets = await Ticket.countDocuments({
      status: "in-progress",
    });

    const resolvedTickets = await Ticket.countDocuments({
      status: "resolved",
    });

    res.status(200).json({
      success: true,
      data: {
        totalTickets,
        openTickets,
        inProgressTickets,
        resolvedTickets,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getDashboardStats };
