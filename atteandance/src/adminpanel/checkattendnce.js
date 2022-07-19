import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';







export default function Checkattendence() {
    const [data, setData] = useState([]);
    const statedata = useLocation();
    const authtoken = statedata.state.authtoken;
    const studentid = statedata.state.studentid;
    const navigate = useNavigate();

    useEffect(() => {

        axios.get("/findonestudentattendance/" + studentid,
            {

                headers: {
                    "AdminAuthToken": authtoken
                }
            })
            .then((res) => {
                setData(res.data);

            })
            .catch(err => console.error(err));
    }, [])

    return (
        <div className='viewatt-table-div'>

            <table className="table table-success table-striped ">

                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope='col'>date</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {

                            return <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.markeddate}</td>
                                <td>{item.status}</td>

                                <td>
                                    <FontAwesomeIcon icon={faEdit} onClick={() => {

                                        navigate("/admin/updateattandence", { state: { authtoken: authtoken, id: item._id, } });

                                    }} className="me-4 icon" />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => {
                                        console.log(item._id);

                                        axios
                                            .get("/deleteoneattendance/" + item._id, {
                                                headers: {
                                                    "AdminAuthToken": authtoken
                                                }
                                            })
                                            .then((res) => {
                                                console.log(res);
                                                window.location.reload();
                                            })
                                            .catch(err => console.error(err));
                                    }} className="me-4 icon" />
                                </td>
                            </tr>

                        })
                    }

                </tbody>
            </table>
            <div>
                <button className='btn btn-primary'>Mark attendence for this student</button>
                
            </div>

        </div >
    )
}
