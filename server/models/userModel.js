import mongoose from "mongoose";
import validator from 'validator'
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Please enter your Name"],
        min: [5, 'Must be at least 5'],
    },
    email: {
        type: String,
        required: [true, "enter a  email"],
        validate: [validator.isEmail, "value must be email"],
        unique: [true, "this email is already exist"],

    },
    Password: {
        type: String,
        required: [true, "enter the password"],
        select: false
    },
    Mobile: {
        type: Number,
        required: [true, "enter the mobile number"],
        min: [10, "must be at least 10 numbers"]
    },
    isSuperUser: {
        default: false,
        type: Boolean
    }
}, { timestamps: true })
const User = mongoose.model("User", userSchema)
export default User;
