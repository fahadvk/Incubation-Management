/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "awesome-react-icons";
import React, { useState } from "react";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const NavSidebar = () => {
    // const history = useHistory();
    const Navigate = useNavigate()
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <React.Fragment>
            {/* Sidebar Overlay */}




            {/* Sidebar */}
            <div className="sideDiv"

            >

                <Navigation
                    activeItemId={location.pathname}
                    onSelect={({ itemId }) => {
                        // history.push(itemId);
                        Navigate(`${itemId}`)

                    }}
                    items={[
                        {
                            title: "Home",
                            itemId: "/",
                            // Optional
                            elemBefore: () => <Icon name="smartphone" />
                        },
                        {
                            title: "Applications",
                            itemId: "/applications",
                            elemBefore: () => <Icon name="activity" />,
                            // subNav: [
                            //     {
                            //         title: "",
                            //         itemId: "/about/projects",
                            //         // Optional
                            //         elemBefore: () => <Icon name="cloud-snow" />
                            //     },
                            //     {
                            //         title: "Members",
                            //         itemId: "/about/members",
                            //         elemBefore: () => <Icon name="coffee" />
                            //     }
                            // ]
                        },

                        {
                            title: "Slot",
                            itemId: "/slot",
                            // Optional
                            elemBefore: () => <Icon name="book" />
                        },

                    ]}
                />


            </div>
        </React.Fragment>
    );
};
