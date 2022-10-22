import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken"



const signToken = id => {
    return Jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}
const doSignup = async (req, res, next) => {
    console.log("body", req.body)

    try {
        if (req.body.Password !== req.body.confirmPass) {
            res.status(400).send({ "error": "Passwords does'nt match" })

        }
        let Password = req.body.Password
        Password = await bcrypt.hash(Password, 10)
        console.log(Password)
        req.body.Password = Password;
        let user = await User.create(req.body)
        const token = signToken(user._id)
        res.status(200).send({ token, success: true })
    }
    catch (error) {
        console.log(error)
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).send(errors);
        }
        next(error)
    }
}
const doLogin = async (req, res, next) => {
    try {
        console.log(process.env.JWT_SECRET_KEY)
        let Exist = await User.findOne({ email: req.body.email }).select('+Password')
        console.log(Exist)
        if (!Exist) {
            res.status(400).send({ failed: true, message: "user Not Exist" })
        }
        else {

            const validPass = await bcrypt.compare(req.body.Password, Exist.Password)
            if (validPass) {
                if (Exist.isSuperUser) {

                    const token = signToken(Exist._id)
                    // Jwt.sign({ id: Exist._id }, process.env.JWT_SECRET_KEY, {
                    //     expiresIn: process.env.JWT_EXPIRES_IN,
                    // })
                    res.status(200).send({ token, isAdmin: true, success: true })
                }
                else {
                    const token = signToken(Exist._id)
                    res.status(200).send({ token, isAdmin: false, success: true })
                }

            }
            else {
                res.status(400).send({ failed: true, message: "invalid Password" })
            }

        }
    }
    catch (error) {
        res.status(400).send({ message: "Something wrong" })
        next(error)
    }

}

export { doSignup, doLogin }
