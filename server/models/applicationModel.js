

import mongoose from "mongoose"
const application = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String
    },
    City: {
        type: String
    },
    state: {
        type: String
    },
    email: {
        type: String
    },

    mobile: {
        type: Number
    },
    CompanyName: {
        type: String
    },
    Logo: {
        type: String
    },
    TeamAndManagement: {
        type: String
    },
    ProductsAndCompanyProfile: {
        type: String
    },
    Problem: {
        type: String
    },


    uniqueSolution: {
        type: String
    },
    status: {
        type: Boolean
    },
    userId: {
        type: mongoose.Types.ObjectId
    }



}, { timestamps: true })
const Application = mongoose.model("application", application)
export default Application