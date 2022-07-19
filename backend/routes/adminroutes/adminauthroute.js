const express = require('express');
const adminmodel = require('../../models/admin/adminuser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fetchadmin = require('../../middleware/adminmiddleware');
const user = require('../../models/user');
const jwtsecret = "adminsecret";



router.post("/admin/signup", async (req, res) => {


    const user = await adminmodel.create({ email: "waqar@gmail.com", password: "12345" });
    res.send(user);
});

router.post("/admin/login", async (req, res) => {

    const { email, password } = req.body;


    try {

        const adminuser = await adminmodel.findOne({ email, password });


        if (!adminuser) {
            res.send({ problem: "No user is Found against these Credintials" });

        } else {
            const data = {
                user: {
                    id: adminuser.id
                }
            }

            const authtoken = jwt.sign(data, jwtsecret);

            res.send({ authtoken: authtoken });
        }

    } catch (error) {
        res.status(400).send("some error occured");
        console.log(error);
    }




});
router.get("/admin/getallusers", fetchadmin, async (req, res) => {

    try {
        const users =await user.find().select("-password");
        res.send(users);

    } catch (error) {
        res.status(400).send("some error occured");
        console.log(error);
    }

  


});



router.get("/admin/getuser/:id", fetchadmin, async (req, res) => {
    const id=req.params.id;

    try {
        const users =await user.findById(id).select("-password");
        res.send(users);

    } catch (error) {
        res.status(400).send("some error occured");
        console.log(error);
    }

  


});


router.get("/getadmin", fetchadmin, async (req, res) => {

    const adminid = req.adminuser.id;
    const admin = await adminmodel.findById(adminid).select("-password");
    res.send(admin);


});






module.exports = router;

