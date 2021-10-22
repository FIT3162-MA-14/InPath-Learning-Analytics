import React from "react";
import ReactEcharts from "echarts-for-react";

const NumberOfReadsChart = (props) => {
    const student = 10;
    const higherBadge = props.badge;
    const avgHigherBadges = 20;
    const option = {
        title: {
            text: "Number of Reads",
        },
        color: ["#5470c6", "#64C9CF"],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },

        grid: {
            bottom: "10%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: ["You", `Average of ${higherBadge}`],
                axisTick: {
                    alignWithLabel: true,
                },
            },
        ],
        yAxis: [
            {
                name: "Number of Reads",
                type: "value",
            },
        ],

        series: [
            {
                name: "Number of Reads",
                type: "bar",
                barWidth: "50%",
                data: [
                    {
                        value: student,
                        itemStyle: {
                            color: "#a90000",
                        },
                    },
                    avgHigherBadges,
                ],
            },
        ],
    };

    return (
        <ReactEcharts
            option={option}
            style={{ height: "350px", width: "100%" }}
            className="react_for_echarts"
        />
    );
};

export default NumberOfReadsChart;
