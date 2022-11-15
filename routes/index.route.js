const router = require('express').Router()
const authenticate = require('../middleware/authenticate')
const authRoutes = require('./auth.route')
const userRoutes = require('./users.route')
const adminAttendanceRoutes = require('./admin-attendance.route')
const studentAttendanceRoutes = require('./student-attendance.route')


router.use("/api/v1/auth", authRoutes)
router.use('/api/v1/users', authenticate, userRoutes)
router.use('/api/v1/admin/attendance',authenticate, adminAttendanceRoutes)
router.use('/api/v1/student/attendance',authenticate, studentAttendanceRoutes)


module.exports = router