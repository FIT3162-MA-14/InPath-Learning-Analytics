import React, { useState, useEffect } from "react";
import Axios from "axios";
import ReactEcharts from "echarts-for-react";
import { CircleLoading } from "react-loadingg";

const DayGaugeChart = ({ indiv, highest }) => {
    const total = 120;
    const [load1, setLoad1] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [other, setOther] = useState(0);
    const [user, setUser] = useState(0);

    useEffect(() => {
        if (!load1)
            Axios.get("http://localhost:5000/api/getMaxDay/").then((res) => {
                console.log(res.data[0].max);
                setOther(parseInt(res.data[0].max));
                setLoad1(true);
                console.log("Getting max days_visited in gauge chart.");
            });
    }, []);

    useEffect(() => {
        if (!load2)
            Axios.get(
                "http://localhost:5000/api/getUserDay/" +
                    localStorage.getItem("id")
            ).then((res) => {
                console.log(res.data[0].days_visited);
                setUser(parseInt(res.data[0].days_visited));
                setLoad2(true);
                console.log("Getting user days_visited in gauge chart.");
            });
    }, []);

    const gaugeData = [
        {
            value: Math.round((other / total) * 100),
            name: "Highest",
            title: {
                offsetCenter: ["0%", "-30%"],
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ["0%", "-10%"],
            },
            itemStyle: {
                color: "#6D8299",
            },
        },
        {
            value: Math.round((user / total) * 100),
            name: "You",
            title: {
                offsetCenter: ["0%", "20%"],
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ["0%", "40%"],
            },
            itemStyle: {
                color: "#64C9CF",
            },
        },
    ];
    const option = {
        title: {
            text: "Percentage of Days Visited over Total Days",
        },
        series: [
            {
                type: "gauge",
                startAngle: 90,
                endAngle: -270,
                pointer: {
                    show: false,
                },
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    clip: false,
                    itemStyle: {
                        borderWidth: 1,
                        // borderColor: "#464646",
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 40,
                    },
                },
                splitLine: {
                    show: false,
                    distance: 0,
                    length: 10,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                    distance: 50,
                },
                data: gaugeData,
                title: {
                    fontSize: 14,
                },
                detail: {
                    width: 50,
                    height: 14,
                    fontSize: 14,
                    color: "auto",
                    borderColor: "auto",
                    borderRadius: 20,
                    borderWidth: 1,
                    formatter: "{value}%",
                },
            },
        ],
    };
    return load1 && load2 ? (
        <ReactEcharts
            option={option}
            notMerge
            style={{ height: "350px", width: "100%" }}
            className="react_for_echarts"
        />
    ) : (
        <CircleLoading />
    );
};

export default DayGaugeChart;
