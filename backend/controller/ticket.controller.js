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

// const getticketid = async (req, res) => {
//   try {
//     // const filedata = await data.findById(req.params.id);

//     const filedata = await data
//       .findById(req.params.id)
//       // .find({ createdBy: req.params.id })
//       .populate("createdBy", "name email role");

//     if (!filedata) {
//       return res.status(400).json({
//         success: false,
//         message: "data not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "data found succesfully!",
//       data: filedata,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: "err.message",
//     });
//   }
// };

const getticketid = async (req, res) => {
  try {
    const filedata = await data
      // .find({ createdBy: req.params.id })
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

module.exports = { createticket, getticket, getticketid, deleteticket };
