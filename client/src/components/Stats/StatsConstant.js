import React, { useState, useEffect } from "react";
import Axios from "axios";
import { metrics, metricsName } from "../Dashboard/DashboardConstants";

// no need replace data
// export const metricsName = [
//     "Number of Posts",
//     "Number of Replies",
//     "Number of Posts Read",
//     "Number of Days Visited",
//     "Number of Likes Received",
//     "Number of Words Posted",
// ];

// export const metrics = [
//     postIndiv.reduce(reducer),
//     replyIndiv.reduce(reducer),
//     viewIndiv,
//     dayIndiv,
//     likeIndiv,
//     wordIndiv,
// ];

export const IndivStats = () => {
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
        });
    });

    // number of replies
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserReply/" +
                localStorage.getItem("id")
        ).then((res) => {
            setReply(res.data[0].count);
        });
    });

    // number of posts read
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserRead/" +
                localStorage.getItem("id")
        ).then((res) => {
            setRead(res.data[0].posts_read_count);
        });
    });

    // number of days visited
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserDay/" + localStorage.getItem("id")
        ).then((res) => {
            setDays(res.data[0].days_visited);
        });
    });

    // number of likes received
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserLike/" +
                localStorage.getItem("id")
        ).then((res) => {
            setLikes(res.data[0].likes_received);
        });
    });

    // word count
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserWord/" +
                localStorage.getItem("id")
        ).then((res) => {
            setWords(res.data[0].sum);
        });
    });

    return [
        {
            title: metricsName[0],
            icon: "https://img-premium.flaticon.com/png/512/4116/premium/4116612.png?token=exp=1633421176~hmac=4109ae2ee58754c4c16cde75a78b25a3",
            desc: `${post} posts`,
        },
        {
            title: metricsName[1],
            icon: "https://cdn-icons-png.flaticon.com/512/1391/1391034.png",
            desc: `${reply} replies`,
        },
        {
            title: metricsName[2],
            icon: "https://cdn-icons-png.flaticon.com/512/2436/2436636.png",
            desc: `${read} posts read`,
        },
        {
            title: metricsName[3],
            icon: "https://cdn-icons-png.flaticon.com/512/1582/1582043.png",
            desc: `${days} days visited`,
        },
        {
            title: metricsName[4],
            icon: "https://img-premium.flaticon.com/png/512/3220/premium/3220682.png?token=exp=1633421201~hmac=a3e5407ec257511dcdc035d86b6a7036",
            desc: `${likes} likes received`,
        },

        {
            title: metricsName[5],
            icon: "https://img-premium.flaticon.com/png/512/3131/premium/3131597.png?token=exp=1633421255~hmac=a1ebe0a2a862a5fecd90ec19d487a351",
            desc: `${words} words posted`,
        },
    ];
};

export const Items = [
    {
        title: metricsName[0],
        icon: "https://img-premium.flaticon.com/png/512/4116/premium/4116612.png?token=exp=1633421176~hmac=4109ae2ee58754c4c16cde75a78b25a3",
        desc: `${metrics[0]} posts`,
    },
    {
        title: metricsName[1],
        icon: "https://cdn-icons-png.flaticon.com/512/1391/1391034.png",
        desc: `${metrics[1]} replies`,
    },
    {
        title: metricsName[2],
        icon: "https://cdn-icons-png.flaticon.com/512/2436/2436636.png",
        desc: `${metrics[2]} posts read`,
    },
    {
        title: metricsName[3],
        icon: "https://cdn-icons-png.flaticon.com/512/1582/1582043.png",
        desc: `${metrics[3]} days visited`,
    },
    {
        title: metricsName[4],
        icon: "https://img-premium.flaticon.com/png/512/3220/premium/3220682.png?token=exp=1633421201~hmac=a3e5407ec257511dcdc035d86b6a7036",
        desc: `${metrics[4]} likes received`,
    },

    {
        title: metricsName[5],
        icon: "https://img-premium.flaticon.com/png/512/3131/premium/3131597.png?token=exp=1633421255~hmac=a1ebe0a2a862a5fecd90ec19d487a351",
        desc: `${metrics[5]} words posted`,
    },
];
