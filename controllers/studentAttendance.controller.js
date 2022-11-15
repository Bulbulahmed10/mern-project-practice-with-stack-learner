const AdminAttendance = require("../models/AdminAttendance.model")
const StudentAttendance = require('../models/StudentAttendance.model')
const error = require('../utils/error')
const {addMinutes, isAfter} = require('date-fns')


const getAttendance = async (req, res, next) => {
    const {id} = req.params
    try {
        /**
         * step 1 - Find admin attendance by id
         * step 2 - check if it is running or not
         * step 3 - register entry
         * step 4 - check already register or not
         */
        const adminAttendance = await AdminAttendance.findById(id)
        if(!adminAttendance) {
            throw error('Invalid Attendance ID', 400)
        }

        if(adminAttendance.status === 'COMPLETED'){
            throw error('Attendance Already Completed', 400)
        }

        let attendance = await StudentAttendance.findOne({
            adminAttendance: id,
            user: req.user._id
        })
        
        if(attendance) {
            throw error('Already Register', 400)
        }

         attendance = new StudentAttendance({
            user: req.user._id,
            adminAttendance: id
        })

        await attendance.save()
        return res.status(201).json(attendance)

    } catch (error) {
        next(error)
    }
}

const getAttendanceStatus = async (req, res, next) => {
    try {
        const status = await AdminAttendance.findOne({status: "RUNNING"})
        if(!status){
            throw error("Not Running", 400)
        }

        const started = addMinutes(new Date(status.createdAt), status.timeLimit)
        if(isAfter(new Date(), started)) {
            status.status = "COMPLETED"
            await status.save()
        }
        res.status(200).json(status)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAttendance,
    getAttendanceStatus
}
