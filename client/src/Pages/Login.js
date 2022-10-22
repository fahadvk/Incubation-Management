import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginContainer from "../components/login/login";

const LoginPage = () => {


    const loading = useSelector(state => state.alert)
    console.log(useSelector)
    console.log(loading)
    return (
        <Fragment>
            <LoginContainer />
        </Fragment>
    )
}
export default LoginPage