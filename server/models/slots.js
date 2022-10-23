import mongoose from "mongoose";
const Slotschema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    company: {
        type: String
    },
    status: {

    },

})
const Slot = mongoose.Model('Slot', Slotschema)
export default Slot