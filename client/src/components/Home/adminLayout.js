import React, { Fragment } from 'react';
import { NavSidebar } from './sidebar';
import Applicationlist from './newapplicationlist';
import Nav from "./navbar"

function adminLayout(props) {
    return (
        <Fragment>
            <Nav></Nav>
            <NavSidebar />


            <Applicationlist ></Applicationlist>
        </Fragment>
    );
}

export default adminLayout;