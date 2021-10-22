import styled from "styled-components";

const bgColor = "#FAFAFA";

export const DashboardContainer = styled.div`
    background-color: ${bgColor};
    height: 100%;
    max-width: 100%;
    /* padding-top: 30px; */
    padding-bottom: 60px;
    padding-right: 50px;
    padding-left: 50px;
`;

export const DashboardWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    grid-gap: 50px;
    justify-content: center;
    width: 50%;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`;

export const BadgeWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 20px;
    justify-content: center;
    max-width: 100%;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
        margin: 0;
    }

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
        margin: 0;
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 0;
        margin: 0;
    }
`;

export const FeedbackWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 50px;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
        margin: 0;
    }

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
        margin: 0;
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 0;
        margin: 0;
    }
`;

export const DashboardCard = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 30px;
    width: 550px;
    height: 400px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
`;

export const OneRowCard = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 10px;
    max-height: 340px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
`;

export const DashboardCardNoSize = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
    font-size: 20px;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
`;

export const DashboardH1 = styled.h1`
    padding-top: 20px;
    font-size: 2rem;
    font-weight: bold;
`;

export const DashboardH2 = styled.h2`
    padding-top: 20px;
    font-size: 2rem;
`;

export const BadgeIcon = styled.img`
    height: 30px;
    width: 30px;
    margin-right: 5px;
`;
