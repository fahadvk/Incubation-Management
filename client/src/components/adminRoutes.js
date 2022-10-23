import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
async function adminProtectedRoutes(props) {
    if (localStorage.getItem("token")) {
        const response = await axios.get("/api/admin/auth", {
            headers:
            {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        if (response.success) {

            return props.children
        }
        else {
            return <Navigate to="/login" />
        }
    }
    else {

        return <Navigate to="/login" />
    }
}

export default adminProtectedRoutes;