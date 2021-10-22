import React, { useEffect, useState, createContext } from "react";
import Axios from "axios";
import {
    StatsContainer,
    StatsCard,
    StatsIcon,
    StatsH2,
    StatsWrapper,
    StatsP,
    StatsH1,
    FeedbackStatsCard,
} from "./StatsElem";
import { IndivStats } from "./StatsConstant";
import {
    metrics,
    metricsName,
    metricsWord,
    getAvgEachBadge,
} from "../Dashboard/DashboardConstants";
import IndivFbRadarChart from "./IndivFbRadarChart";
import axios from "axios";

const Stats = () => {
    // start here
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

    const [postLoaded, setPostLoaded] = useState(false);
    const [replyLoaded, setReplyLoaded] = useState(false);
    const [readLoaded, setReadLoaded] = useState(false);
    const [daysLoaded, setDaysLoaded] = useState(false);
    const [likesLoaded, setLikesLoaded] = useState(false);
    const [wordsLoaded, setWordsLoaded] = useState(false);

    // number of posts
    useEffect(() => {
        if (!postLoaded)
            Axios.get(
                "http://localhost:5000/api/getUserPost/" +
                    localStorage.getItem("id")
            ).then((res) => {
                setPost(res.data[0].count);
                setPostLoaded(true);
            });
    });

    // number of replies
    useEffect(() => {
        if (!replyLoaded)
            Axios.get(
                "http://localhost:5000/api/getUserReply/" +
                    localStorage.getItem("id")
            ).then((res) => {
                setReply(res.data[0].count);
                setReplyLoaded(true);
            });
    });

    // number of posts read
    useEffect(() => {
        if (!readLoaded)
            Axios.get(
                "http://localhost:5000/api/getUserRead/" +
                    localStorage.getItem("id")
            ).then((res) => {
                setRead(res.data[0].posts_read_count);
                setReadLoaded(true);
            });
    });

    // number of days visited
    useEffect(() => {
        if (!daysLoaded)
            Axios.get(
                "http://localhost:5000/api/getUserDay/" +
                    localStorage.getItem("id")
            ).then((res) => {
                setDays(res.data[0].days_visited);
                setDaysLoaded(true);
            });
    });

    // number of likes received
    useEffect(() => {
        if (!likesLoaded)
            Axios.get(
                "http://localhost:5000/api/getUserLike/" +
                    localStorage.getItem("id")
            ).then((res) => {
                setLikes(res.data[0].likes_received);
                setLikesLoaded(true);
            });
    });

    // word count
    useEffect(() => {
        if (!wordsLoaded)
            Axios.get(
                "http://localhost:5000/api/getUserWord/" +
                    localStorage.getItem("id")
            ).then((res) => {
                setWords(res.data[0].sum);
                setWordsLoaded(true);
            });
    });
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

    const resAll = [
        getAvgEachBadge(avgPostLs, avgBadgeLs)[1],
        getAvgEachBadge(avgReplyLs, avgBadgeLs)[1],
        getAvgEachBadge(avgReadLs, avgBadgeLs)[1],
        getAvgEachBadge(avgDayLs, avgBadgeLs)[1],
        getAvgEachBadge(avgLikeLs, avgBadgeLs)[1],
        getAvgEachBadge(avgWordLs, avgBadgeLs)[1],
    ];

    const avgFb = badge === "Rookies" ? resAll : resHof;

    const feedbackMsg = (indiv, avg, word) => {
        const diffAvg = Math.round(Math.abs(indiv - avg));
        if (badge === "Rookies" && avg >= indiv) {
            return `You are ${diffAvg} ${word} behind the average in All Star! Be more active!`;
        } else if (badge !== "Rookies" && avg >= indiv) {
            return `You are ${diffAvg} ${word}  behind the average in Hall of Fame! Keep it up!`;
        } else if (badge !== "Rookies" && indiv > avg) {
            return `Congratulations! You are ${diffAvg} ${word} ahead the average in Hall of Fame! Keep it up!`;
        } else {
            return `You are ${diffAvg} ${word} ahead the average in All Star even though you are in Rookies! Congratulations and keep it up!`;
        }
    };

    return (
        <>
            <StatsContainer>
                <StatsH1>Individual Statistics</StatsH1>
                <StatsWrapper>
                    {IndivStats().map((items) => (
                        <StatsCard>
                            <StatsIcon src={items.icon} />
                            <StatsH2>{items.title}</StatsH2>
                            <StatsP>{items.desc}</StatsP>
                        </StatsCard>
                    ))}
                </StatsWrapper>
                <br />
                <br />
                <StatsH1>Feedback</StatsH1>
                <FeedbackStatsCard>
                    <IndivFbRadarChart />
                </FeedbackStatsCard>
                <br />
                <StatsWrapper>
                    {indiv.map((metric, id) => (
                        <StatsCard>
                            <h2>{metricsName[id]}</h2>
                            <h4>
                                {feedbackMsg(
                                    metric,
                                    avgFb[id],
                                    metricsWord[id]
                                )}
                            </h4>
                        </StatsCard>
                    ))}

                    <br />
                </StatsWrapper>
            </StatsContainer>
        </>
    );
};

export default Stats;
