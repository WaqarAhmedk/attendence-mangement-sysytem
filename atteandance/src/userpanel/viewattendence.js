import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from "axios";

export default function Viewattendence() {
    const data = useLocation();
    const authtoken = data.state.authtoken;
    const [attndata, setAttndata] = useState([]);
    const [name ,setName]=useState("");

    useEffect(() => {
        axios
        .get("http://localhost:4000/getuser", {
            headers: {
                "AuthToken":authtoken
            }
        })
        .then((res)=>{
            if (res.status==200 && res.data !="") {
                setName(res.data.name);

                
            } else {
                
            }
        })
        .catch(err => console.error(err));

        axios
            .get("http://localhost:4000/viewattandence", {
                headers: {
                    "AuthToken": authtoken
                }
            })
            .then((res) => {
                setAttndata(res.data);

                console.log(res.data);

            })
            .catch(err => console.error(err));
    }, [])

    return (
        <div className='viewatt-table-div'>
            <div>
                <h1>{name}</h1>
            </div>
            <table className="table table-success table-striped ">

                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th className="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Time</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        attndata.map((item ,index) => {

                            return <tr>
                                <th scope="row">{index+1}</th>

                                <td>{item.markeddate}</td>
                                <td>{item.status}</td>
                                <td>{item.markedat}</td>
                            </tr>
                        })
                    }


                </tbody>
            </table>

        </div>
    )
}
