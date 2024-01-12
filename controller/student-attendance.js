const StudentAttendance = require("../models/StudentAttendance");
const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

const getAttendance = async (req, res, next) => {
  try {
    const id = req.params.id;
    // TODO find admin attendance by id
    const adminAttendance = await AdminAttendance.findById(id);

    if (!adminAttendance) {
      throw error(400, "Invalid Attendance Id");
    }

    if (adminAttendance.status === "COMPLETED") {
      throw error(400, "Attendance not running!");
    }

    let attendance = await StudentAttendance.findOne({
      user: res.user._id,
      adminAttendance: id,
    });

    if (attendance) {
      throw error(400, "Already Register!");
    }

    attendance = new StudentAttendance({
      user: res.user._id,
      adminAttendance: id,
    });
    await attendance.save();
    return res.status(201).json({
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

const getAttendanceStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });

    if (!running) {
      throw error(400, "Not Running...");
    }

    const started = addMinutes(new Date(running.createdAt), running.timeLimit);

    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }

    res.status(200).json({
      running,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAttendance,
  getAttendanceStatus,
};
