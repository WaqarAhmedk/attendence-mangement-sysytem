const mongoose = require("mongoose");

const attandenceSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    status:{
        type:String,
        required:true
    },
    markeddate:{
        type:String,
        required:true,
    },
    markedat:{
        type:Date,
        default:Date.now
    }
});

const attandencemodel=mongoose.model("attandence" ,attandenceSchema);

module.exports=attandencemodel;