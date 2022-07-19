const express = require('express');
const fetchuser = require('../../middleware/fetchuser');
const attandencemodel = require('../../models/attandence');
const leavesmodel = require('../../models/leavesmodel');
const router = express.Router();




router.get("/markleave", fetchuser, async (req, res) => {
    const user = req.user.id;
    const date = new Date();


    const todaydate = date.toLocaleDateString({ year: "numeric", month: "numeric", day: "numeric" });
    console.log(todaydate);

    try {



        const check = await leavesmodel.findOne({ user: user, dateadded: todaydate });
        console.log(check);
        if (!check) {
            const leave = new leavesmodel({
                user: user,
                status: "Leave",
                dateadded: todaydate,

            });
            const appliedleave = await leave.save();

            res.send({ status: "success", msg: "User,s Leave Request is sent to Admin" });



        }
        else {
            res.send({ status: "fail", msg: "You already asked for today,s leave" })
        }









    } catch (error) {
        console.log("Error is here " + error);
        res.send("Some internal serve error");
    }

});


router.post("/markattendence", fetchuser, async (req, res) => {
    const { status } = req.body;
    const date = new Date();


    const todaydate = date.toLocaleDateString({ year: "numeric", month: "numeric", day: "numeric" });


    try {
        const val = await attandencemodel.findOne({ user: req.user.id, markeddate: todaydate });


        if (!val) {

            const attan = new attandencemodel({ status, user: req.user.id, markeddate: todaydate });


            const attandence = await attan.save();
            res.send({
                status: "pass",
                msg: "Your attendence is marked for date " + todaydate,
                details: attandence,
            });
        }
        else {
            res.send({
                status: "fail",
                msg: "You already marked today,s attandence"
            });
        }
    }
    catch (error) {
        console.log("Error is here " + error);
        res.send("Some internal serve error");
    }





});


router.get("/viewattandence", fetchuser, async (req, res) => {

    try {

        const allattandence = await attandencemodel.find({ user: req.user.id });
        res.send(allattandence);

    } catch (error) {
        console.log("Error is " + error);
        res.send("Some internal serve error");
    }


});

module.exports = router;