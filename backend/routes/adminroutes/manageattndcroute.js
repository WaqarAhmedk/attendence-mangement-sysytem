const express = require('express');
const fetchadmin = require('../../middleware/adminmiddleware');
const attandencemodel = require('../../models/attandence');
const leavesmodel = require('../../models/leavesmodel');
const user = require('../../models/user');
const router = express.Router();



// Admin will get all the users record that are registered 
router.get("/admin/fetchallusers", async (req, res) => {

    try {
        const users = await user.find().select("-password");
        if (!users) {
            res.send("No Students are Registered");
        }

        res.send(users);

    } catch (error) {
        console.log("Error is " + error);
        res.send("Some internal serve error");
    }
});


//Admin will get all the record of all students attandences

router.get("/fetchallattend", fetchadmin, async (req, res) => {

    try {
        const attend = await attandencemodel.find();
        if (!attend) {
            res.send("No Attendence is marked yet");
        }

        res.send(attend);

    } catch (error) {
        console.log("Error is " + error);
        res.send("Some internal serve error");
    }
});


//admin can get a specidic student attandence record
router.get("/findonestudentattendance/:id", fetchadmin, async (req, res) => {

    const id = req.params.id;


    try {
        const singlerecord = await attandencemodel.find({ user: id });

        console.log(singlerecord.length);

        res.send(singlerecord);

    } catch (error) {
        console.log("Error is " + error);
        res.send("Some internal serve error");
    }

});


//admin can delete a specific student attandence

router.get("/deleteoneattendance/:id", fetchadmin, async (req, res) => {

    const id = req.params.id;

    try {
        const deltedrecord = await attandencemodel.deleteOne({ _id: id });
        res.send(deltedrecord)

    } catch (error) {
        console.log("Error is " + error);
        res.send("Some internal serve error");
    }

});


//find a day attendence by id
router.get("/findoneattendance/:id", fetchadmin, async (req, res) => {

    const id = req.params.id;

    try {
        const singlerecord = await attandencemodel.findById(id);
        res.send(singlerecord);

    } catch (error) {
        console.log("Error is " + error);
        res.send("Some internal serve error");
    }

})

//admin cn update a specific student attandence record

router.post("/updateattendeance/:id", fetchadmin, async (req, res) => {
    const { status } = req.body;
    const id = req.params.id;

    try {

        const changedattndc = await attandencemodel.updateOne({ _id: id }, { $set: { status: status } });
        console.log(changedattndc);
        res.send(changedattndc);


    } catch (error) {
        console.log("Error is " + error);
        // res.send("Some internal serve error");
    }

});


// //Genreate report for one user
// router.post("/admin/generatereport/:id",fetchadmin, async(req, res) => {
//     const { startdate ,enddate } = req.body;
//     const id = req.params.id;

//     try {
//        const report=await attandencemodel.find();

//     } catch (error) {
//         console.log("Error is " + error);
//         res.send("Some internal serve error");
//     }

// })

router.get("/fetchallleaves", fetchadmin, async (req, res) => {

    try {
        const allleaves = await leavesmodel.find();
        if (!allleaves) {
            res.send("No Leave Application is submitted");
        }

        res.send(allleaves);

    } catch (error) {
        console.log("Error is " + error);
        res.send("Some internal serve error");
    }
});

//Approve leave

router.get("/approveleave/:id", fetchadmin, async (req, res) => {
    const id = req.params.id;

    try {
        const leave = await leavesmodel.findById(id);

        if (!leave) {
            res.send("No Leave Application is submitted");
        }



        const user = leave.user;





        const leavedate = leave.dateadded;
        const val = await attandencemodel.findOne({ user: user, markeddate: leavedate });
        console.log(val);


        if (!val) {

            const attan = new attandencemodel({ status: "leave", user: user, markeddate: leavedate });
            const attandence = await attan.save();

            const deleted = await leavesmodel.findByIdAndDelete(id);
            res.send({
                status: "done",
                msg: "Leave is Approved for this user"
            })


        }
        else {
            const deleted = await leavesmodel.findByIdAndDelete(id);
            console.log(deleted);

            res.send({
                problem: "duplicate",
                msg: "User Already marked his attendence as Present leave application is rejected"
            });
        }






    } catch (error) {
        console.log("Error is " + error);
        res.send("Some internal serve error");
    }
});





router.get("/report/:id", fetchadmin, async (req, res) => {
    let p = 0, a = 0, l = 0, uid = ""; grade = ""; totaldays = 0;
    const id = req.params.id;


    try {

        const r = await attandencemodel.find({ user: id });

        r.map((item) => {
            totaldays++;

            if (item.status === "present") {
                p++;

            }
            else if (item.status === "absent") {
                a++;
            }
            else if (item.status === "leave") {
                l++;
            }

        });
        //finding if the attendence is greater then 80%
        const ans = (p / totaldays) * 100;
        console.log(ans);
        if (ans >= 80) {
            grade = "A"
        } else if (ans >= 70 && ans < 80) {
            grade = "B"
        }
        else if (ans >= 60 && ans < 70) {
            grade = "C"
        }
        else if (ans >= 50 && ans < 60) {
            grade = "D"
        } else {
            grade = "F"
        }


        res.send({ presents: p, leaves: l, absents: a, grade: grade });
        // console.log("presents are" + p + " leaves are" + l + " absents are" + a);



    } catch (error) {
        console.log(error);

    }

})

module.exports = router;