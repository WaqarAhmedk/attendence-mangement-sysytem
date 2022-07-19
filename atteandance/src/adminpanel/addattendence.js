import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';




export default function Updateattendance() {
    const [val, setVal] = useState("");
    const [datval, setDatval] = useState("");
    const navigate = useNavigate();

    const data = useLocation();
    const authtoken = data.state.authtoken;
    const id = data.state.id;
    const [studentid, setStudentid] = useState();

    useEffect(() => {

        axios
            .get("/findoneattendance/" + id, {
                headers: {
                    "AdminAuthToken": authtoken
                }
            })
            .then((res) => {



                setStudentid(res.data.user);
                console.log(studentid);
                setVal(res.data.status);
                setDatval(res.data.markeddate);

            })
            .catch(err => console.error(err));

    }, [])
    return (
        <>

            <div>
                <h4>For Date</h4>
                <h3>{datval}</h3>
                <label >Choose Status</label>

                <select value={val} onChange={(e) => {

                    setVal(e.target.value)

                }}>
                    <option value=""></option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="leave">On Leave</option>

                </select>


            </div>
            <button className='btn btn-primary mt-5' onClick={


                () => {
                    console.log(authtoken)
                    val === "" ? console.log("Select any value") :
                        axios.post("/updateattendeance/" + id, {
                            status: val,

                        }, {
                            headers: {
                                "AdminAuthToken": authtoken
                            }
                        }).then((res) => {

                            console.log(res);
                            if (res.data.acknowledged === true) {

                                navigate("/admin/checkallattendence", { state: { authtoken: authtoken, studentid: studentid } })
                            }
                        })
                            .catch(err => console.error(err));
                }
            }>Update Attendence</button>
        </>
    )
}
