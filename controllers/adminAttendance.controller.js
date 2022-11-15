const {addMinutes, isAfter} = require('date-fns')
const AdminAttendance = require('../models/AdminAttendance.model')
const error = require('../utils/error')

const getEnable = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({status: "RUNNING"})
        if(running) {
           throw error("Already Running", 400)
        }
        const adminAttendance = new AdminAttendance()
        await adminAttendance.save()
        return res.status(201).json({message: "Success", adminAttendance})
    } catch (error) {
        next(error)
    }
}

const getDisable = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({status: "RUNNING"})
    if(!running){
        throw error("Not Running", 400)
    }

    running.status = "COMPLETED"
    await running.save()
    return res.status(200).json(running)
    } catch (error) {
        next(error)
    }
}

const getStatus = async (_req, res, next) => {
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
    getEnable, 
    getDisable,
    getStatus
}