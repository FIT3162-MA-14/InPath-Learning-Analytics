import React, { useState, useEffect } from "react";
import Axios from "axios";
import ReactEcharts from "echarts-for-react";
import { CircleLoading } from "react-loadingg";

const CategoryRadarChart = (props) => {
    const [load1, setLoad1] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [cat, setCat] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [user, setUser] = useState([0, 0, 0, 0, 0, 0, 0]);
    const category = props.category;

    useEffect(() => {
        if (!load1) {
            Axios.get("http://localhost:5000/api/getAllPerCat/").then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].cat_name === "Assignment 1") {
                        cat[0] = parseInt(res.data[i].count);
                        setCat(cat);
                    } else if (res.data[i].cat_name === "Assignment 2") {
                        cat[1] = parseInt(res.data[i].count);
                        setCat(cat);
                    } else if (res.data[i].cat_name === "Exam") {
                        cat[2] = parseInt(res.data[i].count);
                        setCat(cat);
                    } else if (res.data[i].cat_name === "General") {
                        cat[3] = parseInt(res.data[i].count);
                        setCat(cat);
                    } else if (res.data[i].cat_name === "Lecture") {
                        cat[4] = parseInt(res.data[i].count);
                        setCat(cat);
                    } else if (res.data[i].cat_name === "Mid-Semester Test") {
                        cat[5] = parseInt(res.data[i].count);
                        setCat(cat);
                    } else if (res.data[i].cat_name === "Tutorials") {
                        cat[6] = parseInt(res.data[i].count);
                        setCat(cat);
                    }
                }
                setLoad1(true);
                console.log("Getting all users per category in radar chart.");
            });
        }
    }, []);

    useEffect(() => {
        if (!load2) {
            Axios.get(
                "http://localhost:5000/api/getUserPerCat/" +
                    localStorage.getItem("id")
            ).then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].cat_name === "Assignment 1") {
                        user[0] = parseInt(res.data[i].count);
                    } else if (res.data[i].cat_name === "Assignment 2") {
                        user[1] = parseInt(res.data[i].count);
                    } else if (res.data[i].cat_name === "Exam") {
                        user[2] = parseInt(res.data[i].count);
                    } else if (res.data[i].cat_name === "General") {
                        user[3] = parseInt(res.data[i].count);
                    } else if (res.data[i].cat_name === "Lecture") {
                        user[4] = parseInt(res.data[i].count);
                    } else if (res.data[i].cat_name === "Mid-Semester Test") {
                        user[5] = parseInt(res.data[i].count);
                    } else if (res.data[i].cat_name === "Tutorials") {
                        user[6] = parseInt(res.data[i].count);
                    }
                }
                setUser(user);
                setLoad2(true);
                console.log("Getting user per category in radar chart.");
            });
        }
    });

    const option = {
        color: ["#FFB085", "#64C9CF", "#56A3F1", "#FF917C"],
        title: {
            text: "Post Per Category",
        },
        tooltip: {
            trigger: "item",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {
            left: "65%",
        },
        radar: [
            {
                indicator: [
                    { text: category[0] },
                    { text: category[1] },
                    { text: category[2] },
                    { text: category[3] },
                    { text: category[4] },
                    { text: category[5] },
                    { text: category[6] },
                ],
                radius: 100,
                startAngle: 90,
                splitNumber: 5,
                shape: "circle",
                axisName: {
                    formatter: "{value}",
                    color: "#428BD4",
                },
                splitArea: {
                    areaStyle: {
                        color: [
                            "#d9d9d9",
                            "#525252",
                            "#737373",
                            "#969696",
                            "#bdbdbd",
                        ],
                        shadowColor: "rgba(0, 0, 0, 0.2)",
                        shadowBlur: 10,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(211, 253, 250, 0.8)",
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(211, 253, 250, 0.8)",
                    },
                },
            },
        ],
        series: [
            {
                type: "radar",
                emphasis: {
                    lineStyle: {
                        width: 4,
                    },
                },
                data: [
                    {
                        // value: [133, 97, 45, 104, 15, 24, 26],
                        value: cat,
                        name: "Total",
                        areaStyle: {
                            color: "rgba(255, 176, 133, 0.6)",
                        },
                    },
                    {
                        // value: [0, 1, 1, 4, 1, 0, 0],
                        value: user,
                        name: "You",
                        areaStyle: {
                            color: "rgba(100, 201, 207, 0.6)",
                        },
                    },
                ],
            },
        ],
    };
    return load1 && load2 ? (
        <ReactEcharts
            option={option}
            notMerge
            style={{ height: "100%", width: "100%" }}
            className="react_for_echarts"
        />
    ) : (
        <CircleLoading />
    );

    // <ReactEcharts
    //     option={option}
    //     style={{ height: "100%", width: "100%" }}
    //     className="react_for_echarts"
    // />
};

export default CategoryRadarChart;
