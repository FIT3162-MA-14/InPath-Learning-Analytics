import React, { useState, useEffect } from "react";
import Axios from "axios";
import ReactEcharts from "echarts-for-react";
import { CircleLoading } from "react-loadingg";

const PostLineChart = ({ indiv, total }) => {
    const [load1, setLoad1] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [other, setOther] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const [user, setUser] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);

    useEffect(() => {
        if (!load1)
            Axios.get("http://localhost:5000/api/getAllPost/").then((res) => {
                console.log(parseInt(res.data[0].total));
                for (let i = 0; i < res.data.length; i++) {
                    other[parseInt(res.data[i].week) - 32] = parseInt(
                        res.data[i].total
                    );
                }
                setOther(other);
                setLoad1(true);
                console.log("Getting user all posts in line chart.");
            });
    }, []);

    useEffect(() => {
        if (!load2)
            Axios.get(
                "http://localhost:5000/api/getUserPostWeek/" +
                    localStorage.getItem("id")
            ).then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    user[parseInt(res.data[i].week) - 32] = parseInt(
                        res.data[i].total
                    );
                }
                setUser(user);
                setLoad2(true);
                console.log("Getting user post per week in line chart.");
            });
    }, []);

    const option = {
        title: {
            text: "Number of Posts",
        },

        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },

        legend: {
            data: ["Total", "You"],
            left: "65%",
        },

        grid: {
            top: "25%",
            bottom: "5%",
            right: "15%",
            containLabel: true,
        },
        xAxis: [
            {
                name: "Week",
                type: "category",
                data: [
                    "W1",
                    "W2",
                    "W3",
                    "W4",
                    "W5",
                    "W6",
                    "W7",
                    "W8",
                    "W9",
                    "W10",
                    "W11",
                    "W12",
                    "W13",
                    "W14",
                    "W15",
                    "W16",
                    "W17",
                ],
                boundaryGap: false,
            },
        ],
        yAxis: [
            {
                name: "Number of Posts",
                type: "value",
            },
        ],

        series: [
            {
                name: "Total",
                type: "line",
                data: other,
                smooth: true,
                color: "#FFB085",
            },
            {
                name: "You",
                type: "line",
                data: user,
                smooth: true,
                color: "#64C9CF",
            },
        ],
    };

    return load1 && load2 ? (
        <ReactEcharts
            option={option}
            style={{ height: "350px", width: "100%" }}
            className="react_for_echarts"
        />
    ) : (
        <CircleLoading />
    );
};

export default PostLineChart;
