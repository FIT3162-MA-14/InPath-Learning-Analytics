import React, { useState, useEffect } from "react";
import Axios from "axios";
import ReactEcharts from "echarts-for-react";
import { getAvgEachBadge } from "../Dashboard/DashboardConstants";

const IndivFbRadarChart = () => {
    const [badge, setBadge] = useState("");
    const [badgeLoaded, setBadgeLoaded] = useState(false);

    useEffect(() => {
        if (!badgeLoaded) {
            Axios.get(
                "http://localhost:5000/api/getUserBadge/" +
                    localStorage.getItem("id")
            ).then((res) => {
                setBadge(res.data[0].rank);
                setBadgeLoaded(true);
            });
        }
    }, []);

    const [fbBadge, setfbBadge] = useState(0);
    const [fbPost, setfbPost] = useState(0);
    const [fbReply, setfbReply] = useState(0);
    const [fbRead, setfbRead] = useState(0);
    const [fbDay, setfbDay] = useState(0);
    const [fbLike, setfbLike] = useState(0);
    const [fbWord, setfbWord] = useState(0);

    // get user's
    const [post, setPost] = useState(0);
    const [reply, setReply] = useState(0);
    const [read, setRead] = useState(0);
    const [days, setDays] = useState(0);
    const [likes, setLikes] = useState(0);
    const [words, setWords] = useState(0);

    // number of posts
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserPost/" +
                localStorage.getItem("id")
        ).then((res) => {
            setPost(res.data[0].count);
            console.log("Get User number of posts: " + res.data[0].count);
        });
    }, []);

    // number of replies
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserReply/" +
                localStorage.getItem("id")
        ).then((res) => {
            setReply(res.data[0].count);
            console.log("Get User reply: " + res.data[0].count);
        });
    }, []);

    // number of posts read
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserRead/" +
                localStorage.getItem("id")
        ).then((res) => {
            setRead(res.data[0].posts_read_count);
            console.log("Get User posts read: " + res.data[0].posts_read_count);
        });
    }, []);

    // number of days visited
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserDay/" + localStorage.getItem("id")
        ).then((res) => {
            setDays(res.data[0].days_visited);
            console.log("Get User days visited: " + res.data[0].days_visited);
        });
    }, []);

    // number of likes received
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserLike/" +
                localStorage.getItem("id")
        ).then((res) => {
            setLikes(res.data[0].likes_received);
            console.log(
                "Get User likes received: " + res.data[0].likes_received
            );
        });
    }, []);

    // word count
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserWord/" +
                localStorage.getItem("id")
        ).then((res) => {
            setWords(res.data[0].sum);
            console.log("Get User word: " + res.data[0].sum);
        });
    }, []);
    var indiv = [post, reply, read, days, likes, words];

    const [load1, setLoad1] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [load3, setLoad3] = useState(false);
    const [load4, setLoad4] = useState(false);
    const [load5, setLoad5] = useState(false);
    const [load6, setLoad6] = useState(false);
    const [load7, setLoad7] = useState(false);

    useEffect(() => {
        if (!load1)
            Axios.get("http://localhost:5000/api/getPostList/").then((res) => {
                setfbPost(res.data);
                setLoad1(true);
            });
    }, []);

    useEffect(() => {
        if (!load2)
            Axios.get("http://localhost:5000/api/getReplyList/").then((res) => {
                setfbReply(res.data);
                setLoad2(true);
            });
    }, []);

    useEffect(() => {
        if (!load3)
            Axios.get("http://localhost:5000/api/getReadList/").then((res) => {
                setfbRead(res.data);
                setLoad3(true);
            });
    }, []);

    useEffect(() => {
        if (!load4)
            Axios.get("http://localhost:5000/api/getDayList/").then((res) => {
                setfbDay(res.data);
                setLoad4(true);
            });
    }, []);

    useEffect(() => {
        if (!load5)
            Axios.get("http://localhost:5000/api/getLikeList/").then((res) => {
                setfbLike(res.data);
                setLoad5(true);
            });
    }, []);

    useEffect(() => {
        if (!load6)
            Axios.get("http://localhost:5000/api/getWordList/").then((res) => {
                setfbWord(res.data);
                setLoad6(true);
            });
    }, []);

    useEffect(() => {
        if (!load7)
            Axios.get("http://localhost:5000/api/getBadgeList/").then((res) => {
                setfbBadge(res.data);
                setLoad7(true);
            });
    }, []);

    // const avgFbArr = resHof;
    let avgPostLs = [];
    for (let i = 0; i < fbPost.length; i++) {
        if (load1)
            avgPostLs[i] = [fbPost[i]["user_id"], fbPost[i]["topic_count"]];
    }

    let avgReplyLs = [];
    for (let i = 0; i < fbReply.length; i++) {
        if (load2)
            avgReplyLs[i] = [fbReply[i]["user_id"], fbReply[i]["reply_count"]];
    }
    let avgReadLs = [];
    for (let i = 0; i < fbRead.length; i++) {
        if (load3)
            avgReadLs[i] = [
                fbRead[i]["user_id"],
                fbRead[i]["posts_read_count"],
            ];
    }
    let avgDayLs = [];
    for (let i = 0; i < fbDay.length; i++) {
        if (load4)
            avgDayLs[i] = [fbDay[i]["user_id"], fbDay[i]["days_visited"]];
    }
    let avgLikeLs = [];
    for (let i = 0; i < fbLike.length; i++) {
        if (load5)
            avgLikeLs[i] = [fbLike[i]["user_id"], fbLike[i]["likes_received"]];
    }

    let avgWordLs = [];
    for (let i = 0; i < fbWord.length; i++) {
        if (load6)
            avgWordLs[i] = [fbWord[i]["user_id"], fbWord[i]["word_count"]];
    }

    let avgBadgeLs = [];
    for (let i = 0; i < fbBadge.length; i++) {
        if (load7)
            avgBadgeLs[i] = [fbBadge[i]["student_id"], fbBadge[i]["rank"]];
    }

    const resHof = [
        getAvgEachBadge(avgPostLs, avgBadgeLs)[0],
        getAvgEachBadge(avgReplyLs, avgBadgeLs)[0],
        getAvgEachBadge(avgReadLs, avgBadgeLs)[0],
        getAvgEachBadge(avgDayLs, avgBadgeLs)[0],
        getAvgEachBadge(avgLikeLs, avgBadgeLs)[0],
        getAvgEachBadge(avgWordLs, avgBadgeLs)[0],
    ];

    const resAll = [
        getAvgEachBadge(avgPostLs, avgBadgeLs)[1],
        getAvgEachBadge(avgReplyLs, avgBadgeLs)[1],
        getAvgEachBadge(avgReadLs, avgBadgeLs)[1],
        getAvgEachBadge(avgDayLs, avgBadgeLs)[1],
        getAvgEachBadge(avgLikeLs, avgBadgeLs)[1],
        getAvgEachBadge(avgWordLs, avgBadgeLs)[1],
    ];

    const avgFb = badge === "Rookies" ? resAll : resHof;

    const higherBadge = () => {
        if (badge === "Rookies") {
            return "All Star";
        } else {
            return "Hall of Fame";
        }
    };
    const option = {
        color: ["#67F9D8", "#fd8d3c", "#FFE434", "#56A3F1"],
        // title: {
        //     text: "Feedback",
        // },
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
                    { text: "Number of Posts" },
                    { text: "Number of Replies" },
                    { text: "Number of Posts Read" },
                    { text: "Number of Days Visited" },
                    { text: "Number of Likes Received" },
                    { text: "Number of Words Posted" },
                ],
                radius: 180,
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
                            "#ece7f2",
                            "#d0d1e6",
                            "#a6bddb",
                            "#74a9cf",
                            "#3690c0",
                            "#0570b0",
                            "#045a8d",
                            "#023858",
                        ],
                        shadowColor: "rgba(0, 0, 0, 0.2)",
                        shadowBlur: 10,
                    },
                },
                // axisLine: {
                //     // lineStyle: {
                //     //     color: "rgba(211, 253, 250, 0.8)",
                //     // },
                // },
                // splitLine: {
                //     // lineStyle: {
                //     //     color: "rgba(211, 253, 250, 0.8)",
                //     // },
                // },
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
                        value: avgFb,
                        name: `Average in Higher level Badge`,
                    },
                    {
                        value: indiv,
                        name: "You",
                        areaStyle: {
                            color: "rgba(255, 228, 52, 0.6)",
                        },
                    },
                ],
            },
        ],
    };
    return (
        <ReactEcharts
            option={option}
            style={{ height: "500px", width: "100%" }}
            className="react_for_echarts"
        />
    );
};

export default IndivFbRadarChart;
