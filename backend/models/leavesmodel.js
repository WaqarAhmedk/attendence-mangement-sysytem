const mongoose = require("mongoose");

const LeavesSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    status: {
        type: String,
        required: true,
    },
    dateadded:{
        type:String,
        required:true,
    },
    appliedat: {
        type: Date,
        default: Date.now
    },

});


const leavesmodel = mongoose.model("leaves", LeavesSchema);
module.exports = leavesmodel;