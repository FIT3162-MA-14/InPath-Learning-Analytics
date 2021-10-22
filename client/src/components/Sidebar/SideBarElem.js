import styled from "styled-components";
import { Link } from "react-router-dom";

const bgColor = "#36506C";
const hoverBgColor = "rgb(235, 247, 253, 0.3)";
const hoverTextColor = "#233142";

export const SideBarNav = styled.nav`
    background-color: ${bgColor};
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    transition: 350ms;
    z-index: 10;
`;

export const SideBarImgWrap = styled.div`
    max-width: 100%;
    height: 120px;
    margin-bottom: 20px;
    padding: 0px 20px 20px 20px;
`;

export const SideBarImg = styled.img`
    width: 100%;
    margin: 10px 10px 20px 0;
`;

export const SideBarWrap = styled.div`
    width: 100%;
`;

export const SideBarMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 80px); /* space between items */
    text-align: left;
    padding-left: 0px;
`;

export const SideBarLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    padding: 20px;
    /* Set the height of each link to a reasonable size */
    height: 20px;
    list-style: none;
    transition: 0.2s ease-in-out;
    color: #fff;
    cursor: pointer;

    /* Change the background and text color when hovering */
    &:hover {
        color: ${hoverTextColor};
        background-color: ${hoverBgColor};
        transition: 0.2 ease-in-out;
    }
`;
export const SideBarLabel = styled.span`
    padding-left: 10px;
    font-size: 18px;
`;

export const BadgeContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const BadgeTitle = styled.h3`
    color: #fff;
    font-size: 22px;
    font-weight: bold;
`;

export const Badge = styled.h1`
    color: #ffe194;
    text-align: center;
    font-size: 40px;
    font-family: "Merriweather", serif;
    font-weight: 700;
`;
