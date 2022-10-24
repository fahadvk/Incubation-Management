import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Icon from "awesome-react-icons";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import swal from 'sweetalert2'


export const Applicationlist = (props) => {
    let response
    const [newApps, setApps] = useState()
    const [selectedApp, setSelected] = useState()
    const getnewApps = async () => {
        response = await axios.get("/api/admin/getnewApp", {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        response = response.data
        setApps(response)
    }
    useEffect(() => {
        getnewApps()
        console.log(response, newApps)
    }, [])
    function createData(calories, fat, carbs, protein) {
        return { calories, fat, carbs, protein };
    }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    const date = (val) => {
        val = new Date(val)

        return val.toUTCString().slice(0, 16)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const triggermodal = (e) => {

        let index = e.target.value
        setSelected(newApps[index])
        handleOpen()
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const AcceptApplication = async (e) => {
        let id = e.target.value

        try {

            const response = await axios.get(`/api/admin/acceptApplication/${id}`, {
                headers: {

                    authorization: 'Bearer ' + localStorage.getItem('token')

                }
            })
            if (response.data.success) {
                swal.fire("success", "application on pending", "success")
                setOpen(false)
            }
        } catch (error) {

        }

    }

    return (
        <>
            <React.Fragment>
                <div class="applist">
                    <h3 className=" card-header text-center mt-5">New Applications</h3>
                    {/* <div class=" card-body d-flex justify-content-around">
                        <h5 class="card-title">CompanyName</h5>
                        <h6 class="card-text">UserName</h6>
                        <h6>date</h6>
                        <Icon name='eye'></Icon>
                        {/* <a href="#" class="btn btn-success text-center">view</a> */}
                </div>
                {/* </div> */}
            </React.Fragment>

            {newApps?.length > 0 && <TableContainer className='Apptable' component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>index</TableCell>
                            <TableCell align=''>CompanyName</TableCell>
                            <TableCell align="">UserName</TableCell>
                            <TableCell align="">Date</TableCell>
                            <TableCell align=""></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newApps?.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align=''>{row.CompanyName}</TableCell>
                                <TableCell align="">{row.userId.Name}</TableCell>
                                <TableCell align="">{date(row.createdAt)}</TableCell>
                                <TableCell align=""><a className='btn'> view</a></TableCell>
                                <Button className='mt-3' onClick={triggermodal} value={index}>View</Button>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">

                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Name :  {selectedApp?.Name}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            CompanyName :  {selectedApp?.CompanyName}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Address:  {selectedApp?.Address}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            City  : {selectedApp?.City}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            state  : {selectedApp?.state}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            email  : {selectedApp?.email}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            mobile : {selectedApp?.mobile}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            TeamAndManagement :  {selectedApp?.TeamAndManagement}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            ProductsAndCompanyProfile :  {selectedApp?.ProductsAndCompanyProfile}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Problem :  {selectedApp?.Problem}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            uniqueSolution :  {selectedApp?.uniqueSolution}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            status :  {selectedApp?.status}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            user :  {selectedApp?.userId?.Name}
                        </Typography>
                        <Button onClick={AcceptApplication} color='success' value={selectedApp?._id}> Accept</Button>
                        <Button color="error">Reject</Button>

                    </Box>
                </Modal>
            </div>

        </>
    );

}

export default Applicationlist;