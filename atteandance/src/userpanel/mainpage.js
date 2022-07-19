import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';


export default function Mainpage() {
    const [name, setName] = useState("");
    const [dialogmsg, setDialogmsg] = useState("");
    const [imagepath, setImagepath] = useState("IMG-20220102-WA0015.jpg");

    const data = useLocation();
    const authtoken = data.state.authtoken;

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openform, setOpenform] = useState(false);
    const [avatar, setavatar] = useState("");

    const handleClickOpenform = () => {
        setOpenform(true);
    };

    const handleCloseform = (event) => {
        event.preventDefault();
        
        
        const formdata = new FormData();
        formdata.append("avatar", avatar);
        axios.post("/updateavatar",formdata,{
               headers: {
                    "AuthToken": authtoken
                },
                
            }).then((res) => {
              


            })
            .catch(err => console.error(err))





        setOpenform(false);

    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);

    };


    useEffect(() => {
        axios
            .get("http://localhost:4000/getuser", {
                headers: {
                    "AuthToken": authtoken
                }
            })
            .then((res) => {
                if (res.status == 200 && res.data != "") {
                    setName(res.data.name);

                    setImagepath(res.data.avatar);
                    console.log(avatar);



                } else {

                }
            })
            .catch(err => console.error(err));
    }, []);


    //Function to mark Attendence

    const MarkAttendence = () => {
        return axios.post("http://localhost:4000/markattendence", {
            status: "present",
        },
            {
                headers: {
                    "AuthToken": authtoken
                }
            }).then((res) => {
                console.log(res);
                if (res.data.status === "pass") {
                    setDialogmsg(res.data.msg);
                    handleClickOpen();
                }
                else if (res.data.status === "fail") {
                    setDialogmsg(res.data.msg);
                    handleClickOpen();
                }

            })
            .catch(err => console.error(err));
    }


    return (
        <>

            <Dialog
                open={openform}
                onClose={handleCloseform}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Select your image
                </DialogTitle>
                <DialogContent>
                    <form encType='multipart/form-data'>
                        <input type="file" onChange={(e)=>{
                            setavatar(e.target.files[0]);
                        }} />
                    </form>
                </DialogContent>

                <DialogActions>

                    <Button onClick={handleCloseform} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>





            <div className='navbar'>
                <img height={"50px"} src={require("../images/logo.png")} />
                <div className='profile-div' onClick={handleClickOpenform}>
                    {
                        console.log(imagepath)
                    }
                    <img className="rounded-circle" width={"50px"} height={"50px"} src={require("../../public/avatars/" + imagepath)} />
                    <span >{name}</span>

                </div>

            </div>




            <div className='mainpage-div'>
                <button type="button" className="btn btn-primary ms-3" onClick={MarkAttendence}>Mark Attendence</button>
                <button type="button" className="btn btn-secondary ms-3" onClick={() => {
                    axios
                        .get("/markleave", {
                            headers: {
                                "AuthToken": authtoken
                            }
                        })
                        .then((res) => {
                            console.log(res.data);

                            if (res.data.status === "success") {
                                setDialogmsg(res.data.msg);
                                handleClickOpen();
                            } else {
                                setDialogmsg(res.data.msg);
                                handleClickOpen();
                            }
                        })
                        .catch(err => console.error(err));
                }
                }>Mark Leave</button>
                <button type="button" className="btn btn-info ms-3" onClick={() => {
                    navigate("/viewattendence", { state: { authtoken: authtoken } });
                }} >View Attendence</button>
            </div>



            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogmsg}
                </DialogTitle>

                <DialogActions>

                    <Button onClick={handleClose} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    )
}
