import styled from "styled-components";

const bgColor = "#FAFAFA";

// export const StatsContainer = styled.div `
//     background-color: ${bgColor};
//     height: 100vh;
//     max-width: 100%;
//     margin-right: 0px;
//     padding-left: 300px;
//     display: grid;
//     align-content: space-around;
//     /* padding-top: 100px; */
// `
export const StatsContainer = styled.div`
    background-color: ${bgColor};
    height: 100%;
    max-width: 100%;
    padding-top: 30px;
    padding-right: 50px;
    padding-left: 300px;
`;

export const StatsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 50px;
    justify-content: center;
    padding: 0px 20px;

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

export const StatsCard = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    max-height: 280px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
`;

export const FeedbackStatsCard = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
`;

export const StatsIcon = styled.img`
    height: 100px;
    width: 100px;
    margin-bottom: 20px;
`;

export const StatsH1 = styled.h1`
    padding-top: 20px;
    font-size: 2rem;
    font-weight: bold;
`;

export const StatsH2 = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: bold;
`;

export const StatsP = styled.p`
    font-size: 1.1rem;
    text-align: center;
`;
