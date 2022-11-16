
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple, blue, grey, blueGrey } from '@mui/material/colors';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';



function SimpleDialog(props) {
    const [apps, setApps] = useState([])
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {

        onClose(selectedValue);
    };
    const slotid = props.slotid;
    const handleListItemClick = async (id) => {
        try {
            await axios.put("/api/admin/slotconfirm", {
                slotid, id,
            },
                {
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('token')
                    }

                })
        } catch (error) {

        }

        onClose(id);
    };
    const getData = async () => {
        try {
            const response = await axios.get("/api/admin/getApprovedlist", {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })

            setApps(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(apps, "ldkjf")
    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Set a Company</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {apps?.map((data) => (

                        < ListItem button onClick={() => handleListItemClick(data._id)} key={data._id}>
                            <ListItemAvatar>
                            </ListItemAvatar>
                            <ListItemText primary={data?.CompanyName} />
                        </ListItem>
                    ))}
                </List>
            </Dialog >
        </>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};


export default function CustomizedButtons(props) {


    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState([]);
    let color = blue[600]
    if (props.slot.status) {
        color = grey[500]


    }

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blue[300]),
        backgroundColor: color,
        '&:hover': {
            backgroundColor: purple[700],
        },
        marginLeft: '20px',
        padding: '15px 15px',


    }));

    const handleClickOpen = (e) => {

        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };




    return (
        <>
            <Stack spacing={2} direction="row" className='mt-4'>
                <ColorButton onClick={handleClickOpen} disabled={props.slot?.status} id={props.slot._id} variant="contained">{props.slot.name}</ColorButton>

            </Stack>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                slotid={props.slot._id}
            />

        </>
    );
}
