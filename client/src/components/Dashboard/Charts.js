import React, { useState, useEffect } from "react";
import Axios from "axios";

import {
    DashboardCard,
    DashboardWrapper,
    DashboardH1,
    FeedbackWrapper,
    DashboardCardNoSize,
    OneRowCard,
} from "./DashboardElem";
// import PostGauge from "./Charts/PostGauge";
// import RepliesGauge from "./Charts/RepliesGauge";
// import WordsGauge from "./Charts/WordsGauge";
import CategoryRadarChart from "./ECharts/CategoryRadarChart";
import {
    // currentBadge,
    categoryNames,
    postIndiv,
    postTotal,
    postHighest,
    replyIndiv,
    replyTotal,
    replyHighest,
    viewIndiv,
    viewHighest,
    dayIndiv,
    dayHighest,
    likeIndiv,
    likeHighest,
    wordIndiv,
    wordHighest,
    metrics,
    metricsName,
    metricsWord,
    getAvgEachBadge,
} from "./DashboardConstants";
import PostLineChart from "./ECharts/PostLineChart";
import ReplyBarChart from "./ECharts/ReplyBarChart";
import ViewBarChart from "./ECharts/ViewBarChart";
import DayGaugeChart from "./ECharts/DayGaugeChart";
import LikeBarChart from "./ECharts/LikeBarChart";
import FbRadarChart from "./FeedbackCharts/FbRadarChart";

const Charts = () => {
    // start
    const [fbBadge, setfbBadge] = useState([]);
    const [fbPost, setfbPost] = useState([]);
    const [fbReply, setfbReply] = useState([]);
    const [fbRead, setfbRead] = useState([]);
    const [fbDay, setfbDay] = useState([]);
    const [fbLike, setfbLike] = useState([]);
    const [fbWord, setfbWord] = useState([]);

    // get user's
    const [post, setPost] = useState(0);
    const [reply, setReply] = useState(0);
    const [read, setRead] = useState(0);
    const [days, setDays] = useState(0);
    const [likes, setLikes] = useState(0);
    const [words, setWords] = useState(0);

    const [load1, setLoad1] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [load3, setLoad3] = useState(false);
    const [load4, setLoad4] = useState(false);
    const [load5, setLoad5] = useState(false);
    const [load6, setLoad6] = useState(false);
    const [load7, setLoad7] = useState(false);

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

    useEffect(() => {
        if (!load1)
            Axios.get("http://localhost:5000/api/getPostList/").then((res) => {
                setfbPost(res.data);
                setLoad1(true);
            });
    });

    useEffect(() => {
        if (!load2)
            Axios.get("http://localhost:5000/api/getReplyList/").then((res) => {
                setfbReply(res.data);
                setLoad2(true);
            });
    });

    useEffect(() => {
        if (!load3)
            Axios.get("http://localhost:5000/api/getReadList/").then((res) => {
                setfbRead(res.data);
                setLoad3(true);
            });
    });

    useEffect(() => {
        if (!load4)
            Axios.get("http://localhost:5000/api/getDayList/").then((res) => {
                setfbDay(res.data);
                setLoad4(true);
            });
    });

    useEffect(() => {
        if (!load5)
            Axios.get("http://localhost:5000/api/getLikeList/").then((res) => {
                setfbLike(res.data);
                setLoad5(true);
            });
    });

    useEffect(() => {
        if (!load6)
            Axios.get("http://localhost:5000/api/getWordList/").then((res) => {
                setfbWord(res.data);
                setLoad6(true);
            });
    });

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

    //get highest
    const [highPost, sethighPost] = useState(0);
    const [highReply, sethighReply] = useState(0);
    const [highRead, sethighRead] = useState(0);
    const [highDays, sethighDays] = useState(0);
    const [highLikes, sethighLikes] = useState(0);
    const [highWords, sethighWords] = useState(0);

    useEffect(() => {
        Axios.get("http://localhost:5000/api/getMaxPost/").then((res) => {
            sethighPost(res.data[0].max);
        });
    });

    // number of replies
    useEffect(() => {
        Axios.get("http://localhost:5000/api/getMaxReply/").then((res) => {
            sethighReply(res.data[0].max);
        });
    });

    // number of posts read
    useEffect(() => {
        Axios.get("http://localhost:5000/api/getMaxRead/").then((res) => {
            sethighRead(res.data[0].max);
        });
    });

    // number of days visited
    useEffect(() => {
        Axios.get("http://localhost:5000/api/getMaxDay/").then((res) => {
            sethighDays(res.data[0].max);
        });
    });

    // number of likes received
    useEffect(() => {
        Axios.get("http://localhost:5000/api/getMaxLike/").then((res) => {
            sethighLikes(res.data[0].max);
        });
    });

    // word count
    useEffect(() => {
        Axios.get("http://localhost:5000/api/getMaxWord/").then((res) => {
            sethighWords(res.data[0].max);
        });
    });
    var highest = [
        highPost,
        highReply,
        highRead,
        highDays,
        highLikes,
        highWords,
    ];

    // const [cat, setCat] = useState([0, 0, 0, 0, 0, 0, 0]);
    // useEffect(() => {
    //     Axios.get("http://localhost:5000/api/getAllPerCat").then((res) => {
    //         console.log(res);
    //         setCat(res.data);
    //         setLoaded(true);
    //     });
    // }, []);

    // indiv, avg, hof, total
    // const postsData = [8, 4, 15, 50];
    // const repliesData = [15, 10, 30, 80];
    // const wordsData = [148, 200, 300, 1000];

    const charts = [
        <CategoryRadarChart category={categoryNames} />,
        <LikeBarChart indiv={likeIndiv} highest={likeHighest} />,
        <PostLineChart indiv={postIndiv} total={postTotal} />,
        <ReplyBarChart indiv={replyIndiv} total={replyTotal} />,
        <ViewBarChart indiv={viewIndiv} highest={viewHighest} />,
        <DayGaugeChart indiv={dayIndiv} highest={dayHighest} />,
    ];
    const reducer = (accumulator, curr) => accumulator + curr;
    const fbIndiv = [
        postIndiv.reduce(reducer),
        replyIndiv.reduce(reducer),
        viewIndiv,
        dayIndiv,
        likeIndiv,
        wordIndiv,
    ];

    const fbAvgHof = [
        postIndiv.reduce(reducer) + 1,
        replyIndiv.reduce(reducer) + 20,
        viewIndiv + 12,
        dayIndiv + 10,
        likeIndiv + 10,
        wordIndiv + 12,
    ];

    const fbHighest = [
        postHighest,
        replyHighest,
        viewHighest,
        dayHighest,
        likeHighest,
        wordHighest,
    ];

    const feedbackMsg = (indiv, avghof, highest, metric) => {
        const diffAvg = Math.round(Math.abs(indiv - avghof));
        const diffHigh = Math.round(Math.abs(indiv - highest));

        // replace database
        const currentBadge = "Hall of Fame";

        return currentBadge === "Hall of Fame" && indiv > avghof ? ( //higher than avg hof
            indiv === highest ? ( //if is highest
                `Congratulations! You obtained the highest statistics for this metric! Keep it up!`
            ) : (
                <span>
                    Congratulations! You are ahead of the average statistics in
                    Hall of Fame by{" "}
                    <span
                        style={{
                            fontWeight: "bolder",
                            fontSize: "large",
                            color: "#FF7777",
                        }}
                    >
                        {diffAvg}
                    </span>{" "}
                    <span style={{ fontWeight: "bolder" }}>{metric}</span>. You
                    are also{" "}
                    <span
                        style={{
                            fontWeight: "bolder",
                            fontSize: "large",
                            color: "#FF7777",
                        }}
                    >
                        {diffHigh}
                    </span>{" "}
                    <span style={{ fontWeight: "bolder" }}>{metric}</span>{" "}
                    behind the highest statistic for this metric. Keep it up!
                </span>
            )
        ) : (
            <span>
                You are{" "}
                <span
                    style={{
                        fontWeight: "bolder",
                        fontSize: "large",
                        color: "#FF7777",
                    }}
                >
                    {diffAvg}
                </span>{" "}
                <span style={{ fontWeight: "bolder" }}>{metric}</span> behind
                the average in Hall of Fame and{" "}
                <span
                    style={{
                        fontWeight: "bolder",
                        fontSize: "large",
                        color: "#FF7777",
                    }}
                >
                    {diffHigh}
                </span>{" "}
                <span style={{ fontWeight: "bolder" }}>{metric}</span> behind
                the highest statistic for this metric. Let's be more active!
            </span>
        );
    };

    return (
        <>
            <br />
            <DashboardWrapper>
                <DashboardCard>
                    <CategoryRadarChart category={categoryNames} />
                </DashboardCard>
                <DashboardCard>
                    <LikeBarChart indiv={likeIndiv} highest={likeHighest} />
                </DashboardCard>
                <DashboardCard>
                    <PostLineChart indiv={postIndiv} total={postTotal} />
                </DashboardCard>
                <DashboardCard>
                    <ReplyBarChart indiv={replyIndiv} total={replyTotal} />
                </DashboardCard>
                <DashboardCard>
                    <ViewBarChart indiv={viewIndiv} highest={viewHighest} />
                </DashboardCard>
                <DashboardCard>
                    <DayGaugeChart indiv={dayIndiv} highest={dayHighest} />
                </DashboardCard>
            </DashboardWrapper>
            <br />
            <br />
            <DashboardH1>Feedback</DashboardH1>
            <DashboardCardNoSize>
                <FbRadarChart
                    // indiv={metrics}
                    avgHof={resHof}
                    // highest={fbHighest}
                />
            </DashboardCardNoSize>
            <br />
            <FeedbackWrapper>
                {indiv.map((metric, id) => (
                    <OneRowCard>
                        <h2>{metricsName[id]}</h2>
                        <h4>
                            {feedbackMsg(
                                metric,
                                resHof[id],
                                highest[id],
                                metricsWord[id]
                            )}
                        </h4>
                    </OneRowCard>
                ))}
            </FeedbackWrapper>
        </>
    );
};

export default Charts;
