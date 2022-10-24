import User from "../models/userModel.js"
import Application from "../models/applicationModel.js"
import axios from "axios"

export const getHome = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.body.userid })
        if (!user) {
            return res.status(401).send({ message: "user not found", success: false })
        }
        else {
            const Applications = await Application.findOne({ userId: req.body.userid })
            res.status(200).send({ message: "user found", success: true, data: user, Applications })
        }
    } catch (error) {
        res.status(500).send({ message: "failed" })
    }
}
export const getStates = async (req, res, next) => {

    try {
        const response = await axios.get("https://www.universal-tutorial.com/api/states/India", {
            headers:
            {
                authorization: 'Bearer ' + process.env.UNIVERSAL_API_KEY
            }

        })
        let states

        states = response.data.map((val) => {
            return val.state_name
        })

        res.status(200).send({ success: true, states })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false })
    }
}
export const newApplication = async (req, res, next) => {
    // console.log(req.body)
    let newForm = req.body.application;
    newForm.userId = req.body.userid
    console.log(newForm)
    try {

        let createdApplication = await Application.create(newForm)
        res.status(200).send("success")
    } catch (error) {
        res.status(500).send(error)
    }

}
export const getUserApplications = async (req, res, next) => {
    console.log(req.body)
    try {

        const userApplications = await Application.findOne({ userId: req.body.userid })
        res.status(200).send({ success: true, userApplications })
    } catch (error) {
        res.status(500).send("failed")
    }

}