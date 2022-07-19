const mongoose = require("mongoose");
const dbname = "attendence";
const conurl = "mongodb://localhost:27017/"+dbname;


const ConnectDb = () => {

    mongoose.connect(conurl)
    .then(console.log("Connected with database " + dbname))
    .catch((error) => {
        console.log("there is a error"+error);
    });
}
module.exports=ConnectDb;