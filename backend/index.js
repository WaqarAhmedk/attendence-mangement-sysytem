const { Router, json } = require("express");
const express = require("express");
const portno = "4000";
const authroute = require("./routes/userroutes/authroutes");
const attandenceroute = require("./routes/userroutes/attandenceroute");
const adminauthroute = require("./routes/adminroutes/adminauthroute");
const mangeattndncroute = require("./routes/adminroutes/manageattndcroute")
const ConnectDb = require("./database/dbconnection");
const cors = require('cors');






const app = express();
app.use(express.json());
app.use(cors());





//routes
app.use(authroute);
app.use(adminauthroute);

app.use(attandenceroute);

app.use(mangeattndncroute);


app.get("/", (req, res) => {
    res.send("ddsd");
})


app.listen(portno, () => {
    console.log("App is Runing on port" + portno);
});
ConnectDb();