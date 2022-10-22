import React, { useEffect } from 'react';
import axios from 'axios';
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
const UserApplications = () => {
    const getData = async () => {
        try {
            const response = await axios.get("/api/user/getuserApplications", {
                headers:
                {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            console.log(response)
        } catch (error) {

        }
    }
    useEffect(() => {

        getData()
    }, [])
    return (
        <React.Fragment>
            <h2 className='text-center mt-5'> Your Applications </h2>

        </React.Fragment>
    );
}

export default UserApplications;