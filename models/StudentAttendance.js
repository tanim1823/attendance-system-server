const { Schema, model } = require("mongoose");

const studentAttendanceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    adminAttendance: {
      type: Schema.Types.ObjectId,
      ref: "AdminAttendance",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);

module.exports = StudentAttendance;
