
import React, { useEffect, useState } from 'react';
import Box from '../components/Box'
import Icon from '@mui/material/Icon';
import { NavSidebar } from '../components/Home/sidebar';
import Nav from '../components/Home/navbar';
import axios from 'axios';
import { Button } from '@mui/material';
function SlotPage(props) {



    const [slots, setSlots] = useState([])
    const getSlots = async () => {
        try {

            const response = await axios.get("/api/admin/getSlots", {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setSlots(response.data)
        } catch (error) {

        }
    }
    const addSlot = async () => {
        try {
            const response = await axios.put("/api/admin/addSlot", {}, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            getSlots()
            // location.reload()

        } catch (error) {
            console.log(error)
        }

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

            <Button onClick={addSlot}> <Icon baseClassName="material-icons-two-tone" sx={{ marginLeft: 5 }}  >add_circle</Icon></Button>
        </div>
    </div>
    );
}


export default SlotPage;