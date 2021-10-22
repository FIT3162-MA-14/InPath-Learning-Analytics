import styled from "styled-components";

const bgColor = "#FAFAFA";

export const ManualContainer = styled.div`
    background-color: ${bgColor};
    height: 100vh;
    max-width: 100%;
    padding-top: 30px;
    padding-right: 50px;
    padding-left: 300px;
`;

export const ManualH1 = styled.h1`
    padding-top: 20px;
    font-size: 2rem;
    font-weight: bold;
`;
export const ManualCard = styled.div`
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

export const ManualH2 = styled.h2`
    font-size: 1rem;
    margin-bottom: 10px;
`;

export const ManualP = styled.p`
    font-size: 1rem;
`;

export const Styles = {
    col: {
        marginTop: "30px",
        paddingBottom: "40px",
    },
    card: {
        marginRight: "20px",
    },
    cardBody: {},
};
