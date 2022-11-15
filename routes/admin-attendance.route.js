const { getEnable, getDisable, getStatus } = require('../controllers/adminAttendance.controller')

const router = require('express').Router()

router.get('/enable', getEnable)
router.get('/disable', getDisable)
router.get('/status', getStatus)



module.exports = router