import React, { useState, useEffect } from "react";
import {
    SideBarMenu,
    SideBarNav,
    SideBarWrap,
    SideBarLink,
    SideBarLabel,
    SideBarImg,
    SideBarImgWrap,
    BadgeTitle,
    Badge,
} from "./SideBarElem";
import Axios from "axios";
import { RiDashboardFill } from "react-icons/ri";
import { ImStatsDots, ImTrophy } from "react-icons/im";
import { VscBook } from "react-icons/vsc";
import logo from "../../images/logo.png";
import { Row, Col } from "antd";

const SideBar = ({ toggle }) => {
    const [badge, setBadge] = useState("");
    const [badgeLoaded, setBadgeLoaded] = useState(false);

    useEffect(() => {
        if (!badgeLoaded) {
            Axios.get(
                "http://localhost:5000/api/getUserBadge/" +
                    localStorage.getItem("id")
            ).then((res) => {
                setBadge(res.data[0].rank);
                setBadgeLoaded(true);
            });
        }
    }, []);
    return (
        <>
            <SideBarNav className="sidebar">
                <SideBarWrap className="sidebarwrap">
                    <SideBarImgWrap className="sidebarimgwrap">
                        <SideBarImg
                            className="sidebarimg"
                            src={logo}
                            alt="LightBringers"
                        />
                    </SideBarImgWrap>
                    <SideBarMenu className="sidebarmenu">
                        <SideBarLink
                            className="sidebarlink"
                            to="/dashboard"
                            onClick={toggle}
                        >
                            <RiDashboardFill />
                            <SideBarLabel>Dashboard</SideBarLabel>
                        </SideBarLink>
                        <SideBarLink
                            className="sidebarlink"
                            to="/stats"
                            onClick={toggle}
                        >
                            <ImStatsDots />
                            <SideBarLabel>Individual Statistics</SideBarLabel>
                        </SideBarLink>
                        <SideBarLink
                            className="sidebarlink"
                            to="/badge"
                            onClick={toggle}
                        >
                            <ImTrophy />
                            <SideBarLabel>Ranking</SideBarLabel>
                        </SideBarLink>
                        <SideBarLink
                            className="sidebarlink"
                            to="/manual"
                            onClick={toggle}
                        >
                            <VscBook />
                            <SideBarLabel>Manual</SideBarLabel>
                        </SideBarLink>
                    </SideBarMenu>
                    <Row justify="center">
                        <Col>
                            <BadgeTitle>You are now a(n)</BadgeTitle>
                        </Col>
                        <Col>
                            <Badge>{badge}</Badge>
                        </Col>
                    </Row>
                </SideBarWrap>
            </SideBarNav>
        </>
    );
};

export default SideBar;
