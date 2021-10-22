import React, { useEffect, useState, createContext } from "react";
import Axios from "axios";

// Badge
const badgeArr = ["Hall of Fame", "All Star", "Rookies"];

const GetDB = () => {
    const [currentBadge, setBadge] = useState("");

    useEffect(() => {
        Axios.get(
            "http://localhost:5000/api/getUserBadge/" +
                localStorage.getItem("id")
        ).then((res) => {
            setBadge(res.data[0].rank);
        });
    });

    // // start here
    // const fbBadge = [[]];
    // const fbPost = [[]];
    // const fbReply = [[]];
    // const fbRead = [[]];
    // const fbDay = [[]];
    // const fbLike = [[]];
    // const fbWord = [[]];

    // const resArr1 = [
    //     getAvgEachBadge(fbPost, fbBadge)[0],
    //     getAvgEachBadge(fbReply, fbBadge)[0],
    //     getAvgEachBadge(fbRead, fbBadge)[0],
    //     getAvgEachBadge(fbDay, fbBadge)[0],
    //     getAvgEachBadge(fbLike, fbBadge)[0],
    //     getAvgEachBadge(fbWord, fbBadge)[0],
    // ];
    // const resArr2 = [
    //     getAvgEachBadge(fbPost, fbBadge)[1],
    //     getAvgEachBadge(fbReply, fbBadge)[1],
    //     getAvgEachBadge(fbRead, fbBadge)[1],
    //     getAvgEachBadge(fbDay, fbBadge)[1],
    //     getAvgEachBadge(fbLike, fbBadge)[1],
    //     getAvgEachBadge(fbWord, fbBadge)[1],
    // ];

    // const avgFbArr = currentBadge === "Rookies" ? resArr2 : resArr1;
};
// Dashboard
// Posts Per Category
export const categoryNames = [
    "Assignment 1",
    "Assignment 2",
    "Exam",
    "General",
    "Lecture",
    "Mid Sem Test",
    "Tutorials",
];

export const categoryTotal = [10, 20, 10, 30, 10, 20, 10];

export const categoryIndiv = [5, 10, 5, 8, 7, 10, 5];

// Number of Posts
export const postIndiv = [2, 1, 2, 2, 3, 2, 2, 5, 2, 2, 3, 2, 2, 2, 2, 3, 3];

export const postTotal = [
    5, 6, 10, 12, 13, 12, 12, 15, 12, 12, 13, 12, 12, 12, 12, 13, 13,
];
export const postHighest = 50;

// export const postHighest = 80;

// Number of Replies
export const replyIndiv = [2, 1, 2, 2, 3, 2, 2, 5, 2, 2, 3, 2, 2, 2, 2, 3, 3];

export const replyTotal = [
    5, 6, 10, 12, 13, 12, 12, 15, 12, 12, 13, 12, 12, 12, 12, 13, 13,
];
export const replyHighest = 70;
// export const replyHighest = 100;

// Number of Views
export const viewIndiv = 189;

export const viewHighest = 400;

// Number of Likes
export const likeIndiv = 20;

export const likeHighest = 40;

// Number of days spent
export const dayIndiv = 20;

export const dayHighest = 40;

// Number of words posted
export const wordIndiv = 200;
export const wordHighest = 480;

// Average in the higher badge level (if hof, then use the hof badge level)
// PostgreSQL return all user_id and their total of posts
// MySQL return all user_id and their badge
/*
1. mysql user_ids + badge
2-7: user_ids + metrics
8variables*/

export function getAvgEachBadge(lst, badges) {
    // // user_id, attribute
    // const lst = [
    //     [1, 1],
    //     [2, 3],
    //     [3, 5],
    // ]; //HARDCODE TOBE DELETE
    // const badges = [
    //     [1, 0],
    //     [2, 1],
    //     [3, 2],
    // ];
    var hof = 0,
        allstar = 0,
        rookie = 0;

    var dict = {};
    for (const post of lst) {
        dict[post[0]] = [post[1]];
    }

    for (const badge of badges) {
        const arr = dict[badge[0]];
        dict[badge[0]] = arr ? arr.concat([badge[1]]) : badge[1];
    }

    for (var key in dict) {
        if (dict[key].length <= 0) {
            rookie = rookie + 1;
        } else if (dict[key][1] === 0) {
            allstar = allstar + dict[key][0];
        } else if (dict[key][1] === 2) {
            hof = hof + dict[key][0];
        } else {
            rookie = rookie + dict[key][0];
        }
    }

    return [hof / 18, allstar / 75];
}

export default GetDB;

const res = getAvgEachBadge([[]], [[]]);
const avgHof = res[0];
const avgAll = res[1];
// export const avgFb = currentBadge === "Rookies" ? avgAll : avgHof;

// start here
const fbBadge = [[]];
const fbPost = [[]];
const fbReply = [[]];
const fbRead = [[]];
const fbDay = [[]];
const fbLike = [[]];
const fbWord = [[]];

const resArr1 = [
    getAvgEachBadge(fbPost, fbBadge)[0],
    getAvgEachBadge(fbReply, fbBadge)[0],
    getAvgEachBadge(fbRead, fbBadge)[0],
    getAvgEachBadge(fbDay, fbBadge)[0],
    getAvgEachBadge(fbLike, fbBadge)[0],
    getAvgEachBadge(fbWord, fbBadge)[0],
];
const resArr2 = [
    getAvgEachBadge(fbPost, fbBadge)[1],
    getAvgEachBadge(fbReply, fbBadge)[1],
    getAvgEachBadge(fbRead, fbBadge)[1],
    getAvgEachBadge(fbDay, fbBadge)[1],
    getAvgEachBadge(fbLike, fbBadge)[1],
    getAvgEachBadge(fbWord, fbBadge)[1],
];

// export const avgFbArr = currentBadge === "Rookies" ? resArr2 : resArr1;
// end here

// ignore this
const reducer = (accumulator, curr) => accumulator + curr;
// Array of avgFb for all metrics
export const replaceAvgFbs = [
    postIndiv.reduce(reducer) + 10,
    replyIndiv.reduce(reducer) + 20,
    viewIndiv + 80,
    dayIndiv + 2,
    likeIndiv + 10,
    wordIndiv + 180,
];

export const metricsWord = [
    "posts",
    "replies",
    "posts read",
    "days",
    "likes",
    "words",
];

export const metricsName = [
    "Number of Posts",
    "Number of Replies",
    "Number of Posts Read",
    "Number of Days Visited",
    "Number of Likes Received",
    "Number of Words Posted",
];

export const metrics = [
    postIndiv.reduce(reducer),
    replyIndiv.reduce(reducer),
    viewIndiv,
    dayIndiv,
    likeIndiv,
    wordIndiv,
];
