import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import "react-step-progress-bar/styles.css";
// import { ProgressBar, Step } from "react-step-progress-bar";
//.....................

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const UserApplications = (props) => {
    // const getData = async () => {
    //     try {
    //         const response = await axios.get("/api/user/getuserApplications", {
    //             headers:
    //             {
    //                 authorization: 'Bearer ' + localStorage.getItem('token')
    //             }
    //         })
    //         console.log(response)
    //     } catch (error) {

    //     }
    // }
    console.log("thisisfrom", props.application)
    // useEffect(() => {

    //     getData()
    // }, [])
    const status = props.application?.status

    const steps = [
        'Submitted',
        'OnVerification',
        'Approved',
        'Slot Confirmed',
    ];
    let stat = steps.indexOf(status)
    console.log(stat)

    return (
        <React.Fragment>
            <h2 className='text-center mt-5'> Your Applications </h2>



            <div className='Progress container '>

                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={stat + 1} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

            </div>
        </React.Fragment>
    );
}

export default UserApplications;







