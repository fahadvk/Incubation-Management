import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
function AdminProtectedRoutes(props) {
    if (localStorage.getItem("token")) {
        const verified = verifyAdmin()
        if (verified) {
            return props.children
        }
    }
    else {
        return <Navigate to="/login" />
    }

}

const verifyAdmin = async () => {
    const response = await axios.get("/api/admin/auth", {
        headers:
        {
            authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })

    if (response.data.success) {
        console.log(";sm")
        return true
    }
    else {
        return <Navigate to="/login" />
    }
}

export default AdminProtectedRoutes;