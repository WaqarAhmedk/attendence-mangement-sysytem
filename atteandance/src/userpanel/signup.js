import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const formdata = new FormData();
    return (
        <div className='signup-main-div'>
            <div className='signup-div'>
                <form encType='multipart/form-data'>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" value={name} onChange={(event) => {
                            setName(event.target.value);
                        }} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email} onChange={(event) => {
                            setEmail(event.target.value);
                        }} />
                        <div className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(event) => {
                            setPassword(event.target.value);
                        }} />
                        <div className="form-text">your password is safe and secure  with us </div>

                    </div>
                   



                    <button className="btn btn-primary" onClick={(event) => {
                        event.preventDefault();

                       event.preventDefault();
                        axios
                            .post("/signup", {
                                name:name,
                                email:email,
                                password:password
                            })
                            .then((res) => {
                                console.log(res.data);

                                 navigate("/login");


                            })
                            .catch(err => console.error(err));



                    }} >Register</button>
                

                    <Link to="/login" className=' btn-primary ms-3 mt-5'>Login Page</Link>
                </form>
            </div>
        </div>
    )
}
