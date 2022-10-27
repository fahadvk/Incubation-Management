import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import "react-step-progress-bar/styles.css";
// import { ProgressBar, Step } from "react-step-progress-bar";
//.....................

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const UserApplications = (props) => {

    console.log("thisisfrom", props.application)

    const status = props.application?.status

    const steps = [
        'Submitted',
        'OnVerification',
        'Approved',
        'Slot Confirmed',
    ];
    let stat = steps.indexOf(status)


    return (
        <React.Fragment>
            <h2 className='text-center mt-5'> Your Applications </h2>

            {(status === "Cancelled")
                && <>

                    <Typography className='text-center mt-5' color='error' >Your Application {props?.application?._id} has been cancelled by admin </Typography>

                </>
            }

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

                {(stat === 3 && <p className='ms-5 mt-5 text-center'> your application  has successfully completed slot booking </p>)}

            </div>
        </React.Fragment>
    );
}

export default UserApplications;







