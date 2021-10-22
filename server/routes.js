const router = require("express").Router();
const { body } = require("express-validator");
const { login } = require("./controllers/loginController");
const { register } = require("./controllers/registerController");
const { getUser } = require("./controllers/getUserController");
const db = require("./config/db");
const pgClient = require("./config/postgres");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

router.post(
    "/register",
    [
        body("name", "The name must be of minimum 3 characters length")
            .notEmpty()
            .escape()
            .trim()
            .isLength({ min: 3 }),
        body("email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    register
);

router.post(
    "/login",
    [
        body("email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    login
);

router.get("/getuser", getUser);

router.get("/", function (req, res) {
    res.json({ message: "Welcome to Dashboard!" });
});

// GET database records on /api/records
router.get("/api/records", db.getAllRecords);
router.get("/api/getUserBadge/:id", db.getUserBadge);
router.get("/api/getBadgeAmount", db.getEachBadgeTotal);

// GET from postgres database
router.get("/api/getAllPerCat", pgClient.getAllPerCat); // Total post per category
router.get("/api/getAllPost", pgClient.getAllPost); // Number of Posts by Week (Total)
router.get("/api/getAllReply", pgClient.getAllReply); // Number of Replies by Week (Total)
router.get("/api/getMaxPost", pgClient.getMaxPost);
router.get("/api/getMaxReply", pgClient.getMaxReply);
router.get("/api/getMaxWord", pgClient.getMaxWord);
router.get("/api/getMaxDay", pgClient.getMaxDay);
router.get("/api/getMaxRead", pgClient.getMaxRead);
router.get("/api/getMaxLike", pgClient.getMaxLike);

router.get("/api/getUserPost/:id", pgClient.getUserPost);
router.get("/api/getUserReply/:id", pgClient.getUserReply);
router.get("/api/getUserPostWeek/:id", pgClient.getUserPostWeek);
router.get("/api/getUserReplyWeek/:id", pgClient.getUserReplyWeek);
router.get("/api/getUserRead/:id", pgClient.getUserRead);
router.get("/api/getUserDay/:id", pgClient.getUserDay);
router.get("/api/getUserLike/:id", pgClient.getUserLike);
router.get("/api/getUserPerCat/:id", pgClient.getUserPerCat);
router.get("/api/getUserWord/:id", pgClient.getUserWord);

router.get("/api/getPostList/", pgClient.getPostList);
router.get("/api/getReplyList/", pgClient.getReplyList);
router.get("/api/getReadList/", pgClient.getReadList);
router.get("/api/getWordList/", pgClient.getWordList);
router.get("/api/getLikeList/", pgClient.getLikeList);
router.get("/api/getDayList/", pgClient.getDayList);
router.get("/api/getBadgeList/", db.getBadgeList);

module.exports = router;
