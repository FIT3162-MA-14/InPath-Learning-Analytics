const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");
const pgClient = require("./config/postgres");
const routes = require("./routes");
const app = express();
const PORT = 5000;
var path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

const router = express.Router();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Test route
router.get("/", function (req, res) {
    res.json({ message: "Welcome to Dashboard!" });
});

// GET database records on /api/records
// router.get("/records", db.getAllRecords);
// router.get("/getUserBadge/:id", db.getUserBadge);
// router.get("/getBadgeAmount", db.getEachBadgeTotal);

// // GET from postgres database
// router.get("/getAllPerCat", pgClient.getAllPerCat); // Total post per category
// router.get("/getAllPost", pgClient.getAllPost); // Number of Posts by Week (Total)
// router.get("/getAllReply", pgClient.getAllReply); // Number of Replies by Week (Total)
// router.get("/getMaxPost", pgClient.getMaxPost);
// router.get("/getMaxReply", pgClient.getMaxReply);
// router.get("/getMaxWord", pgClient.getMaxWord);
// router.get("/getMaxDay", pgClient.getMaxDay);
// router.get("/getMaxRead", pgClient.getMaxRead);
// router.get("/getMaxLike", pgClient.getMaxLike);

// router.get("/getUserPost/:id", pgClient.getUserPost);
// router.get("/getUserReply/:id", pgClient.getUserReply);
// router.get("/getUserPostWeek/:id", pgClient.getUserPostWeek);
// router.get("/getUserReplyWeek/:id", pgClient.getUserReplyWeek);
// router.get("/getUserRead/:id", pgClient.getUserRead);
// router.get("/getUserDay/:id", pgClient.getUserDay);
// router.get("/getUserLike/:id", pgClient.getUserLike);
// router.get("/getUserPerCat/:id", pgClient.getUserPerCat);
// router.get("/getUserWord/:id", pgClient.getUserWord);

// router.get("/getPostList/", pgClient.getPostList);
// router.get("/getReplyList/", pgClient.getReplyList);
// router.get("/getReadList/", pgClient.getReadList);
// router.get("/getWordList/", pgClient.getWordList);
// router.get("/getLikeList/", pgClient.getLikeList);
// router.get("/getDayList/", pgClient.getDayList);
// router.get("/getBadgeList/", db.getBadgeList);

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
