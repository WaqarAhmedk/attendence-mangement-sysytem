import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




export default function Approveleave() {
    const [data, setData] = useState([]);
    const [name, setName] = useState([]);
    const [dialogmsg, setDialogmsg] = useState("");
    const userdata = useLocation();
    const authtoken = userdata.state.authtoken;


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
        window.location.reload();
    };



    useEffect(() => {

        axios.get("/fetchallleaves",
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

    const getUser = (id) => {
        axios
            .get("/userdetails/" + id)
            .then((res) => {

                setName(res.data.name);

            })
            .catch(err => console.error(err));
    }

    return (
        <div className='viewatt-table-div'>

            <table className="table table-success table-striped ">

                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope='col'>User id</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {
                            getUser(item.user);

                            return <tr key={item._id}>

                                <th scope="row">{index + 1}</th>

                                <td>{item.user}</td>
                                <td>{item.status}</td>

                                <td>
                                    <button className='btn btn-primary' onClick={() => {

                                        axios.get("/approveleave/" + item._id,
                                            {

                                                headers: {
                                                    "AdminAuthToken": authtoken
                                                }
                                            })
                                            .then((res) => {
                                                console.log(res.data);
                                                if (res.data.problem === "duplicate") {
                                                    setDialogmsg(res.data.msg);
                                                    handleClickOpen();
                                                }
                                                else if (res.data.status === "done") {
                                                    setDialogmsg(res.data.msg);
                                                    handleClickOpen();
                                                }


                                            })
                                            .catch(err => console.error(err));
                                    }}>


                                        Approve Leave
                                    </button>

                                </td>


                            </tr>

                        })
                    }


                </tbody>
            </table>

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



        </div >)
}
