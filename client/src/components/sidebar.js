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
            // className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
            // }`}
            >
                {/* <div className="flex items-center justify-center mt-10 text-center py-6">
                    <span className="mx-2 text-2xl font-semibold text-black">
                        react-minimal-side-navigation
                    </span>
                </div> */}

                {/* https://github.com/abhijithvijayan/react-minimal-side-navigation */}
                <Navigation
                    activeItemId={location.pathname}
                    onSelect={({ itemId }) => {
                        // history.push(itemId);
                        Navigate(`${itemId}`)

                    }}
                    items={[
                        {
                            title: "Home",
                            itemId: "/home",
                            // Optional
                            elemBefore: () => <Icon name="smartphone" />
                        },
                        {
                            title: "Applications",
                            itemId: "/applications",
                            elemBefore: () => <Icon name="activity" />,
                            subNav: [
                                {
                                    title: "",
                                    itemId: "/about/projects",
                                    // Optional
                                    elemBefore: () => <Icon name="cloud-snow" />
                                },
                                {
                                    title: "Members",
                                    itemId: "/about/members",
                                    elemBefore: () => <Icon name="coffee" />
                                }
                            ]
                        },
                        {
                            title: "Home",
                            itemId: "/home",
                            // Optional
                            elemBefore: () => <Icon name="coffee" />
                        },
                        {
                            title: "Slot",
                            itemId: "/home",
                            // Optional
                            elemBefore: () => <Icon name="book" />
                        },
                        {
                            title: "User",
                            itemId: "/user",
                            // Optional
                            elemBefore: () => <Icon name="user" />
                        },
                        {
                            title: "Home",
                            itemId: "/home",
                            // Optional
                            elemBefore: () => <Icon name="cloud-snow" />
                        }
                        // {
                        //     title: "logout",
                        //     itemId: "/logout",


                        // }
                        // {
                        //     title: "Another Tab",
                        //     itemId: "/another",
                        //     subNav: [
                        //         {
                        //             title: "Teams",
                        //             itemId: "/another/teams"
                        //             // Optional
                        //             // elemBefore: () => <Icon name="calendar" />
                        //         }
                        //     ]
                        // }
                    ]}
                />

                {/* <div className="absolute bottom-0 w-full my-8">
                    <Navigation
                        activeItemId={location.pathname}
                        items={[
                            {
                                title: "Settings",
                                itemId: "/settings",
                                elemBefore: () => <Icon name="activity" />
                            }
                        ]}
                        onSelect={({ itemId }) => {
                            // history.push(itemId);
                        }}
                    />
                </div> */}
            </div>
        </React.Fragment>
    );
};
