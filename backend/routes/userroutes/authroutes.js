const express = require("express");
const router = express.Router();
const UserModel = require("../../models/user");
const jwt = require('jsonwebtoken');
const fetchuser = require("../../middleware/fetchuser");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        callback(null, "/home/anonymous-kashmiri/internship/atteandance/public/avatars/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})
const upload = multer({ storage: storage });


const jwtsecret = "hello@";





//signup route
router.post("/signup", upload.single("avatar"), async (req, res) => {

    //object destructuring

    const { name, email, password, } = req.body;

    try {

        let imagename = req.file.originalname;



        // checking if the email already exsists


        const user = await UserModel.findOne({ email });
        if (!user) {
            await UserModel.create({ name, email, password, avatar: imagename })
                .then(res.send({ status: "success", msg: "User Created" }))
                .catch((error) => {
                    res.status(400).send("some error occured " + error);
                });
        }
        else {
            res.send({ status: "fail", msg: "User with this mail already exsists please sign in" })
        }

    } catch (error) {
        console.log(error);

    }
});
router.post("/updateavatar", fetchuser, upload.single("avatar"), async (req, res) => {

    //object destructuring

    const id = req.user.id;

    const avatar = req.file.originalname;


    try {


        const r = await UserModel.findByIdAndUpdate(id, { avatar: avatar });
        console.log(r);
        res.send(r);
        console.log(r.avatar);

    } catch (error) {
        console.log(error);

    }


});

//Sign in route for Student

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        res.send({ problem: "No user Exsist with this email Please sign up" });
    }
    else {
        if (user.password === password) {

            const data = {
                user: {
                    id: user.id
                }
            };

            const Authtoken = await jwt.sign(data, jwtsecret);

            res.status(200).send({ authtoken: Authtoken });
        }
        else {
            res.send({ problem: "Your Password is Incorrect" })
        }
    }
});


router.get("/getuser", fetchuser, async (req, res) => {

    try {
        const userid = req.user.id;
        const user = await UserModel.findById(userid).select("-password");
        if (!user) {
            res.send("No user is found against this token")
        }
        else {

            res.send(user);
        }

    }
    catch (error) {
        res.status(400).send("some error occured");
        console.log(error);
    }



});

router.get("/userdetails/:id", async (req, res) => {
    const userid = req.params.id;
    try {

      
        const user = await UserModel.findById(userid).select("-password");
        if (!user) {
            res.send("No user is found for this id")
        }
        else {

            res.send(user);
        }

    }
    catch (error) {
        res.status(400).send("some error occured");
        console.log(error);
    }



})


module.exports = router;