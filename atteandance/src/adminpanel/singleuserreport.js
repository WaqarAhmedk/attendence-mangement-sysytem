import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
export default function Singleuserreport() {



    const [presents, setPresents] = useState(0);
    const [leaves, setLeaves] = useState(0);
    const [absents, setAbsents] = useState(0);
    const [grade, setGrade] = useState("");
    const data = useLocation();
    const authtoken = data.state.authtoken;
    const uid = data.state.studentid;
    const name = data.state.name;
    const email = data.state.email;
    console.log(uid);



    useEffect(() => {
        axios.get("/report/" + uid, {
            headers: {
                "AdminAuthToken": authtoken
            }
        })
            .then((res) => {
                console.log(res);
                setAbsents(res.data.absents);
                setLeaves(res.data.leaves);
                setPresents(res.data.presents);
                setGrade(res.data.grade)

            })
            .catch(err => console.error(err));
    }, []);




    return (
        <div className='report'>

            <div className='date-div'>
                <label>From</label>
                <input type="datetime-local" />
                <label>To</label>
                <input type="datetime-local" />
            </div>
            <div className='row'>


                <div className="table-responsive col-6">

                    <table className="table table-success table-striped">

                        <thead>
                            <tr>

                                <th scope='col'>Student Name</th>
                                <th scope='col'> Student Email</th>
                                <th scope='col'> Total Presents</th>
                                <th scope='col'> Total Absents</th>
                                <th scope='col'> Total Leaves</th>
                                <th scope='col'> Grade</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{presents}</td>
                                <td>{absents}</td>
                                <td>{leaves}</td>
                                <td>{grade}</td>

                            </tr>




                        </tbody>
                    </table>
                </div>



            </div>

        </div >
    )
}
