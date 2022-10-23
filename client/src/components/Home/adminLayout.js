import React, { Fragment } from 'react';
import { NavSidebar } from '../sidebar';
import Applicationlist from '../applicationlist';
import Nav from "./navbar"

function adminLayout(props) {
    return (
        <Fragment>
            <Nav></Nav>
            <NavSidebar />
            <h3 className="text-center mt-5">New Applications</h3>

            <Applicationlist text="sdlkjf"></Applicationlist>
        </Fragment>
    );
}

export default adminLayout;