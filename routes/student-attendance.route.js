const { getAttendanceStatus, getAttendance } = require('../controllers/studentAttendance.controller')

const router = require('express').Router()


router.get('/status', getAttendanceStatus)
router.get('/:id', getAttendance)



module.exports = router