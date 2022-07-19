import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function Login() {
    const navigate = useNavigate();

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const EmailHandler = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);

    }

    const PasswordHandler = (event) => {

        setPassword(event.target.value);

    }
    return (
        <div className='signup-main-div'>
            <div className='signup-div'>
                <form>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={EmailHandler} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={PasswordHandler} />
                        <div id="emailHelp" className="form-text">your password is safe and secure  with us </div>

                    </div>

                    <button className="btn btn-primary" onClick={(event) => {
                        event.preventDefault();

                     axios.post("http://localhost:4000/signin", {
                            email: email,
                            password: password
                        })
                            .then((res) => {
                              console.log(res.data.authtoken);
                             
                                if (res.status === 200 && typeof res.data.authtoken !="undefined" ) {
                                    const authtoken = res.data.authtoken;
                                    console.log(authtoken);
                                     navigate("/mainpage", { state: { authtoken: authtoken } });
                                }
                                else{
                                    console.log(res.data.problem);
                                }


                            })
                            .catch(err => console.error(err));
                    }}>Login</button>
                </form>
            </div>
        </div>
    )
}
