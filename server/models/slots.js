import mongoose from "mongoose";
const Slotschema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    company: {
        type: String
    },
    application: {
        type: mongoose.Types.ObjectId,
        ref: "Application"
    },
    status: {
        type: Boolean,
        default: false
    },


})
const Slot = mongoose.model('Slot', Slotschema)
export default Slot