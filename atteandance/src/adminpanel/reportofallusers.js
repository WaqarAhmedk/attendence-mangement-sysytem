import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
export default function Reportofallusers() {


    const [users, setUsers] = useState([]);
    const [totals, setTotals] = useState([]);
    const data = useLocation();
    const authtoken = data.state.authtoken;



    useEffect(() => {
        axios.get("http://localhost:4000/admin/getallusers", {
            headers: {
                "AdminAuthToken": authtoken
            }
        })
            .then((res) => {

                console.log(res.data.length);
                res.data.forEach(element => {

                    const result = getTotal(element._id);
                    console.log(result);
                    console.log(element);

                });



            })
            .catch(err => console.error(err));
    }, []);

    const getTotal = async(id) => {

      await  axios.get("/report/" + id, {
            headers: {
                "AdminAuthToken": authtoken
            }
        })
            .then((res) => {

                console.log(res.data);
                return  res.data;

            })
            .catch(err => console.error(err));

    }
    return (
        <div className='report'>

            {/* <div className='date-div'>
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
                                <th scope="col">No</th>
                                <th scope='col'>Student Name</th>
                                <th scope='col'> Student Email</th>
                                <th scope='col'> Student System id</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                users.map((user, index) => {
                                    getTotal(user._id);
                                    return <tr key={
                                        index
                                    }>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user._id}</td>

                                    </tr>
                                })
                            }


                        </tbody>
                    </table>
                </div>
                <div className="table-responsive col-6">
                    <table className="table table-success table-striped  ">
                        <thead>
                            <tr>
                                <th scope='col'>Total presents</th>
                                <th scope='col'>Total Leaves</th>
                                <th scope='col'>Total Absents</th>
                                <th scope='col'>Grade</th>
                            </tr>
                        </thead> 
                        <tbody>

                            {
                                totals.map((st, index) => {

                                    return <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{st.presents}</td>
                                        <td>{st.leaves}</td>

                                    </tr>
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </div> */}

        </div >
    )
}
