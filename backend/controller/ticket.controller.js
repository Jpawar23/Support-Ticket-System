const data = require("../models/ticket.models");
const path = require("path");
const fs = require("fs");
const createticket = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are required",
      });
    }
    const ticket = await data.create({
      title,
      description,
      priority: priority || "Medium",
      status: status || "open",
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully!",
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getticket = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const total = await data.countDocuments();

    const files = await data
      .find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Data Find Succsfully!",
      data: files,
      pagination: {
        total,
        page,
        limit,
        totalpages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("error", error.message);
  }
};

const getTicketsByUser = async (req, res) => {
  try {
    const filedata = await data
      // .findBy(req.params.id)
      .find({ createdBy: req.user.id })
      .populate("createdBy", "name email role");

    if (!filedata || filedata.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No tickets found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tickets found successfully!",
      data: filedata,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyTickets = async (req, res) => {
  try {
    const tickets = await data
      .find({ createdBy: req.user.id }) // 👈 Logged in user
      .populate("createdBy", "name email role");

    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getticketid = async (req, res) => {
  try {
    const filedata = await data
      .findById(req.params.id)
      // .find({ createdBy: req.params.id })
      // .find({ createdBy: req.user.id })
      .populate("createdBy", "name email role");

    if (!filedata || filedata.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No tickets found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tickets found successfully!",
      data: filedata,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteticket = async (req, res) => {
  try {
    const file = await data.findById(req.params.id);
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
    //  Delete from DB
    await data.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "An error occurred during deletion" });
  }
};

const getdashboardstatus = async (req, res) => {
  try {
    // TOtal ticket
    const totalticket = await data.countDocuments();
    const openTickets = await data.countDocuments({ status: "open" });
    const inProgressTickets = await data.countDocuments({
      status: "in-progress",
    });
    const resolvedTickets = await data.countDocuments({
      status: "resolved",
    });
    res.json({
      success: true,
      data: {
        totalticket,
        openTickets,
        resolvedTickets,
        inProgressTickets,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedTicket = await data.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createticket,
  getticket,
  getticketid,
  deleteticket,
  getdashboardstatus,
  getTicketsByUser,
  getMyTickets,
  updateTicketStatus,
};
