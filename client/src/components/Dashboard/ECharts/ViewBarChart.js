import React, { useState, useEffect } from "react";
import Axios from "axios";
import ReactEcharts from "echarts-for-react";
import { CircleLoading } from "react-loadingg";

const ViewBarChart = ({ indiv, highest }) => {
    const [load1, setLoad1] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [other, setOther] = useState(0);
    const [user, setUser] = useState(0);

    useEffect(() => {
        if (!load1)
            Axios.get("http://localhost:5000/api/getMaxRead/").then((res) => {
                setOther(parseInt(res.data[0].max));
                setLoad1(true);
                console.log("Getting max read in view bar chart.");
            });
    }, []);

    useEffect(() => {
        if (!load2)
            Axios.get(
                "http://localhost:5000/api/getUserRead/" +
                    localStorage.getItem("id")
            ).then((res) => {
                setUser(parseInt(res.data[0].posts_read_count));
                setLoad2(true);
                console.log("Getting user read count in view bar chart.");
            });
    }, []);

    const option = {
        title: {
            text: "Number of Posts Read",
        },

        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },

        grid: {
            top: "20%",
            bottom: "8%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: ["Highest", "You"],
                axisTick: {
                    alignWithLabel: true,
                },
            },
        ],
        yAxis: [
            {
                name: "Number of Posts Read",
                type: "value",
            },
        ],

        series: [
            {
                name: "Number of Posts Read",
                type: "bar",
                barWidth: "50%",
                data: [
                    // highest,
                    {
                        value: other,
                        itemStyle: {
                            color: "#6D8299",
                        },
                    },
                    {
                        value: user,
                        itemStyle: {
                            color: "#64C9CF",
                        },
                    },
                ],
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

export default ViewBarChart;
