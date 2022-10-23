import Jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const userAuth = async (req, res, next) => {

    let token
    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]

        }

        await Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {

            if (err) {
                return res.status(401).send({
                    message: "authentication failed",
                    success: false
                })
            }
            else {
                req.body.userid = decoded.id

                next()
            }
        })

    } catch (error) {
        res.status(500).send("error found")
    }
}
export const adminauth = async (req, res, next) => {
    let token
    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]

        }

        Jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {

            if (err) {
                return res.status(401).send({
                    message: "authentication failed",
                    success: false
                })
            }
            else {
                const adminExist = await User.findOne({ _id: decoded.id })
                if (adminExist && adminExist.isSuperUser) {

                    req.body.userid = decoded.id
                    next()
                }
                else {
                    return res.status(401).send({
                        message: "authentication failed",
                        success: false
                    })
                }

            }
        })

    } catch (error) {
        res.status(500).send("error found")
    }
}