import React, { useState, useEffect } from "react";
import Axios from "axios";
import ReactEcharts from "echarts-for-react";
import { CircleLoading } from "react-loadingg";

const ReplyBarChart = ({ indiv, total }) => {
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
            Axios.get("http://localhost:5000/api/getAllReply/").then((res) => {
                console.log(parseInt(res.data[0].total));
                for (let i = 0; i < res.data.length; i++) {
                    other[parseInt(res.data[i].week) - 32] = parseInt(
                        res.data[i].total
                    );
                }
                setOther(other);
                setLoad1(true);
                console.log("Getting all replies in reply bar chart.");
            });
    }, []);

    useEffect(() => {
        if (!load2)
            Axios.get(
                "http://localhost:5000/api/getUserReplyWeek/" +
                    localStorage.getItem("id")
            ).then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    user[parseInt(res.data[i].week) - 32] = parseInt(
                        res.data[i].total
                    );
                }
                setUser(user);
                setLoad2(true);
                console.log(res.data);
                console.log("Getting user reply per week in reply bar chart.");
            });
    }, []);

    const option = {
        title: {
            text: "Number of Replies",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {
            left: "65%",
        },
        grid: {
            left: "8%",
            right: "8%",
            bottom: "8%",
            containLabel: true,
        },
        xAxis: {
            name: "Week",
            nameLocation: "middle",
            nameGap: "35",
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
        },
        yAxis: {
            name: "Number of Replies",
            type: "value",
            boundaryGap: [0, 0.01],
        },
        series: [
            {
                name: "Total",
                type: "bar",
                data: other,
                color: "#FFB085",
            },
            {
                name: "You",
                type: "bar",
                data: user,
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

export default ReplyBarChart;
