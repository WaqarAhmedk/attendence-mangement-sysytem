import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



export default function Adminmainpage() {
    const navigate = useNavigate();
    const data = useLocation();
    const authtoken = data.state.authtoken;

    return (
        <>

            <div className='navbar'>
                <h1>Admin Panel </h1>
            </div>




            <div className='mainpage-div'>

                <button type="button" class="btn btn-primary ms-3" onClick={() => {
                    navigate("/viewallusers", { state: { authtoken: authtoken } });
                }}>View All Users Records</button>

                <button to="/" type="button" class="btn btn-secondary ms-3" onClick={() => {
                    navigate("/admin/approveleaves", { state: { authtoken: authtoken } });
                }}> Leave Approval</button>

                <button type="button" class="btn btn-info ms-3" onClick={
                    () => {
                        navigate("/admin/generatereport", { state: { authtoken: authtoken } })
                    }
                } >Generate All users Report</button>
            </div>
        </>
    )
}
