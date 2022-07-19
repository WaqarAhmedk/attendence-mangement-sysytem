import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';



export default function Viewallusers() {

    const [data, setData] = useState([]);
    const statedata = useLocation();
    const authtoken = statedata.state.authtoken;
    const navigate = useNavigate();
    const [userids, setUserids] = useState([]);





    useEffect(() => {
        axios.get("http://localhost:4000/admin/getallusers", {
            headers: {
                "AdminAuthToken": authtoken
            }
        })
            .then((res) => {

                setData(res.data);

            })
            .catch(err => console.error(err));
    }, []);


    return (
        <div className='viewatt-table-div'>

            <table className="table table-success table-striped ">

                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th className="col">Student Name</th>
                        <th className="col">Student Id</th>
                        <th scope="col">email</th>
                        <th scope='col'>Action</th>
                        <th scope='col'>Report</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {
                            return <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item._id}</td>
                                <td>{item.email}</td>
                                <td onClick={() => {

                                    const id = item._id;
                                    console.log(id);
                                    navigate("/admin/checkallattendence", { state: { authtoken: authtoken, studentid: id } });

                                }}>  <button type="button" className="btn btn-primary ms-3"  >Modify Record</button>
                                </td>
                                <td>
                                    <button className='btn btn-primary' onClick={
                                        () => {

                                            const id = item._id;
                                            console.log(id);
                                            navigate("/admin/singleuserreport", { state: { authtoken: authtoken, studentid: id ,name:item.name ,email:item.email } });

                                        }
                                    }>View Report</button>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>

        </div>
    )
}
