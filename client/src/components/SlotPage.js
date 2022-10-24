
import React, { useEffect, useState } from 'react';
import Box from '../components/Box'

import { NavSidebar } from '../components/Home/sidebar';
import Nav from '../components/Home/navbar';
import axios from 'axios';
import { Button } from '@mui/material';
function SlotPage(props) {



    const [slots, setSlots] = useState([])
    const getSlots = async () => {
        const response = await axios.get("/api/admin/getSlots", {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        setSlots(response.data)

    }

    useEffect(() => {
        getSlots()

    }, [])

    return (<div>
        <Nav></Nav>

        <NavSidebar></NavSidebar>

        <h2 className='text-center mt-4'>Slot Booking</h2>
        <div className='row justify-content-center mt-5'>
            {slots.map((slot, index) => {
                return (<>
                    <Box slot={slot} key={index} />
                </>)
            })}
        </div>
        {/* <SimpleDialogDemo></SimpleDialogDemo> */}
    </div>
    );
}


export default SlotPage;