const router = require("express").Router();
const authRouter = require("./auth");
const userRoutes = require("./user");
const authenticate = require("../middleware/authenticate");
const adminAttendanceRoutes = require("./admin-attendance");
const studentAttendanceRoutes = require("./student-attendance");

router.use("/auth", authRouter);
router.use("/users", authenticate, userRoutes);
router.use("/admin/attendance", authenticate, adminAttendanceRoutes);
router.use("/student/attendance", authenticate, studentAttendanceRoutes);

module.exports = router;
