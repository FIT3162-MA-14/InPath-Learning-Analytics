import React from "react";
import { NavItem, NavbarContainer, DropdownMenu } from "./NavbarElem";
import "./styles.css";
import { ReactComponent as AddIcon } from "../../images/add.svg";
import { ReactComponent as BellIcon } from "../../images/bell.svg";
import { ReactComponent as LogOutIcon } from "../../images/log-out.svg";

// Handle user log out
const handleLogout = (e) => {
    e.preventDefault();

    localStorage.clear();
    window.location.replace("http://localhost:3000/");
};

const NavBar = () => {
    return (
        <NavbarContainer>
            {/* <NavItem icon={<AddIcon />} />
            <NavItem icon={<BellIcon />} /> */}
            <NavItem icon={<LogOutIcon />} onClick={handleLogout}></NavItem>
        </NavbarContainer>
    );
};

export default NavBar;
