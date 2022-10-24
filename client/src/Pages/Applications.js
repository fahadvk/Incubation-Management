
import Applicationlist from '../components/applicationlist';
import { NavSidebar } from '../components/Home/sidebar';
import Nav from "../components/Home/navbar"
const Applications = () => {

    return (
        <div>
            <Nav></Nav>
            <NavSidebar></NavSidebar>

            <Applicationlist></Applicationlist>
        </div>
    );
}

export default Applications;