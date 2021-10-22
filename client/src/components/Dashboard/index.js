import React, { useEffect, useState } from "react";
import Axios from "axios";
import Charts from "./Charts";
import {
    DashboardContainer,
    DashboardH1,
    BadgeWrapper,
    BadgeIcon,
    DashboardCardNoSize,
} from "./DashboardElem";

const hof = "https://cdn-icons-png.flaticon.com/512/861/861506.png";
const allstar =
    "https://img-premium.flaticon.com/png/512/3933/premium/3933739.png?token=exp=1633420422~hmac=e747481d83d1c9d72f41566a35f22fd7";
const rookies =
    "https://img-premium.flaticon.com/png/512/470/premium/470140.png?token=exp=1633420715~hmac=264a954497d0572afe77b66c9caf541b";

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Fetch user data from server api
    useEffect(() => {
        if (!loaded)
            Axios.get("http://localhost:5000/api/getBadgeAmount").then(
                (res) => {
                    console.log(res);
                    setStudents(res.data);
                    setLoaded(true);
                    console.log("Getting badge amount");
                }
            );
    });

    return (
        <>
            {/* <BadgeWrapper>
                {studentNo.map((num, id) => (
                    <DashboardCardNoSize>
                        <h3>
                            <BadgeIcon src={icons[id]}></BadgeIcon>
                            {badgeLevel[id]} : {num} students
                        </h3>
                    </DashboardCardNoSize>
                ))}
            </BadgeWrapper> */}
            <DashboardContainer className="dashboard container">
                <DashboardH1>Dashboard</DashboardH1>
                <br />
                <BadgeWrapper>
                    {loaded ? (
                        <DashboardCardNoSize>
                            <h3>
                                <BadgeIcon src={hof} />
                                Hall of Fame : {students[2].total} students
                            </h3>
                        </DashboardCardNoSize>
                    ) : (
                        <DashboardCardNoSize></DashboardCardNoSize>
                    )}

                    {loaded ? (
                        <DashboardCardNoSize>
                            <h3>
                                <BadgeIcon src={allstar} />
                                All Star : {students[0].total} students
                            </h3>
                        </DashboardCardNoSize>
                    ) : (
                        <DashboardCardNoSize></DashboardCardNoSize>
                    )}
                    {loaded ? (
                        <DashboardCardNoSize>
                            <h3>
                                <BadgeIcon src={rookies} />
                                Rookies : {students[1].total} students
                            </h3>
                        </DashboardCardNoSize>
                    ) : (
                        <DashboardCardNoSize></DashboardCardNoSize>
                    )}
                </BadgeWrapper>
                <br />
                <Charts />
            </DashboardContainer>
        </>
    );
};

export default Dashboard;
