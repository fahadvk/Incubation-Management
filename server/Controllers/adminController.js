import Application from "../models/applicationModel.js";
export const getData = async (req, res, next) => {
    try {
        let getAll = await Application.find({}).sort({ createdAt: -1 })


        res.status(200).send({ getAll })
    } catch (error) {
        res.status(500).send("error")
    }

}