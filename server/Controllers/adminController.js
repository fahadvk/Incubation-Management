import mongoose from "mongoose";
import Application from "../models/applicationModel.js";
import Slot from "../models/slots.js";
import { randomBytes } from 'crypto'
export const getData = async (req, res, next) => {
    try {
        let getAll = await Application.find({}).sort({ createdAt: -1 })


        res.status(200).send({ getAll })
    } catch (error) {
        res.status(500).send("error")
    }

}
export const sendauth = (req, res) => {
    res.status(201).send({ success: true, isadmin: true })
}
export const getnewApps = async (req, res, next) => {
    try {

        const apps = await Application.find({ status: "Submitted" }).populate('userId', 'Name')
        res.status(200).send(apps)
    } catch (error) {
        console.log(error)
        res.status(500).send("failed")
    }
}
export const acceptApplcation = async (req, res, next) => {
    try {
        const found = await Application.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), { status: 'OnVerification' }, { new: true })
        console.log(found)
        res.status(200).send({ success: true })
    } catch (error) {
        res.status(500).send("failed")
    }
}
export const getApps = async (req, res, next) => {
    try {
        const apps = await Application.find({ status: "OnVerification" }).populate("userId", 'Name')
        res.status(200).send(apps)

    } catch (error) {
        res.status(500).send("failed ")
    }
}
export const approveApplcation = async (req, res, next) => {
    try {
        const found = await Application.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), { status: 'Approved' }, { new: true })
        console.log(found)
        res.status(200).send({ success: true })

    } catch (error) {
        res.status(500).send("failed")
    }
}
export const cancelApplication = async (req, res, next) => {
    try {
        const found = await Application.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), { status: 'Cancelled' }, { new: true })
        console.log(found)
        res.status(200).send({ success: true })
    } catch (error) {

    }
}
export const createSlots = async (req, res, next) => {

}
export const getSlots = async (req, res, next) => {
    try {
        const Slots = await Slot.find({})
        res.status(200).send(Slots)
    } catch (error) {
        console.log(error)
        res.status(500).send("failed")
    }
}
export const getApprovedlist = async (req, res, next) => {

    try {
        const response = await Application.find({ status: "Approved" }, "CompanyName Name")
        res.status(200).send(response)
    }

    catch (error) {
        console.log(error)
        res.status(500).send("failed")
    }
}
export const slotconfirm = async (req, res) => {
    try {
        console.log(req.body)
        const slotid = mongoose.Types.ObjectId(req.body.slotid);
        const appid = mongoose.Types.ObjectId(req.body.id);
        await Slot.findOneAndUpdate({ _id: slotid }, { application: appid, status: true })
        await Application.findOneAndUpdate({ _id: appid }, { status: "Slot Confirmed" })
        res.status(201).send("success")
    } catch (error) {
        console.log(error)
    }
}
export const addSlot = async (req, res) => {
    try {
        const rand = randomBytes(1).toString('hex')
        const slot = new Slot({
            name: rand
        })
        await slot.save()

        res.status(201).send("created")
    } catch (error) {

        res.status(500).send('failed')
    }
}