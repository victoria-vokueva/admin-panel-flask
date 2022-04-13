import React, { useState } from "react";
import logo from "../../image/logo192.png"
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData"


const Sidebar = ({isActive, getTitle}) => {

    return (
        <nav id='sidebar' className={isActive ? "active" : null}>
            <div className="sidebar__header">
                <div className="nav__logo">
                    <a title="admin-react-flask" href="/">
                        <i className=""><img src={logo} alt="" /></i>
                        <span className="">Admin-React-Flask</span>
                    </a>
                </div>
            </div>
            <ul className="SidebarList" onClick={(e) => getTitle(e.target.text)}>
                {SidebarData.map((item, key) => {
                    return (
                        <li
                            key={key}
                            className={item.class}
                            id={window.location.pathname == item.link ? "active" : ""} >
                            <Link
                                to={item.link}>
                                <i className={item.icon} />
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}

export default Sidebar