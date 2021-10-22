import styled from "styled-components";
const bgColor = "#FAFAFA";

export const RankContainer = styled.div`
    background-color: ${bgColor};
    max-height: 100%;
    max-width: 100%;
    padding-top: 30px;
    padding-right: 50px;
    padding-left: 300px;
`;
export const RankH1 = styled.h1`
    padding-top: 20px;
    font-size: 2rem;
    font-weight: bold;
`;
export const RankCard = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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

export const RankH2 = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 5px;
    padding-bottom: 0px;
`;

export const RankP = styled.p`
    font-size: 1rem;
    text-align: center;
`;
