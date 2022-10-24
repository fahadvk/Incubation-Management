import mongoose from "mongoose";
import Application from "../models/applicationModel.js";
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
        res.status(200).send({ apps })

    } catch (error) {
        res.status(500).send("failed ")
    }
}