import React, { useState } from "react";
import "./styles.css";
import { ReactComponent as SettingsIcon } from "../../images/settings.svg";

export const NavItem = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <li className="nav-item">
            <a href="/#" className="icon-button" onClick={props.onClick}>
                {props.icon}
            </a>
            {open && props.children}
        </li>
    );
};

export const NavbarContainer = (props) => {
    return (
        <div className="container">
            <nav className="navbar">
                <ul className="navbar-nav">{props.children}</ul>
            </nav>
        </div>
    );
};

export const DropdownMenu = (props) => {
    function DropdownItem(props) {
        return (
            <a href="/" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }
    return (
        <div className="dropdown">
            <DropdownItem leftIcon={<SettingsIcon />}>My Profile</DropdownItem>
        </div>
    );
};
