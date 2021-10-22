const mysql = require("mysql2");

const connection = () => {
    const db = mysql
        .createConnection({
            host: "13.213.240.136", // HOST NAME
            user: "root", // USER NAME
            database: "spark", // DATABASE NAME
            password: "Chewk@i1", // DATABASE PASSWORD
        })
        .on("error", (err) => {
            console.log("Failed to connect to Database - ", err);
        });

    // db.connect(function (err) {
    //     if (err) {
    //         console.log(`connectionRequest Failed ${err.stack}`)
    //     } else {
    //         console.log(`DB connectionRequest Successful ${db.threadId}`)
    //     }
    // });

    return db;
};

// ---------------------------------------------------------------------//

// ---------------------------------------------------------------------//
// Export this constant
exports.getAllRecords = function (req, res) {
    conn = connection();
    conn.query(
        "SELECT COUNT(`student_id`) FROM `rank_prediction` GROUP BY `rank`",
        (err, rows) => {
            if (err) throw err;

            res.json(rows);
        }
    );
    conn.end();
};

// Get total number of students for each badge
exports.getEachBadgeTotal = function (req, res) {
    conn = connection();
    conn.query(
        "SELECT `rank`, COUNT(`student_id`) as total FROM `rank_prediction` GROUP BY `rank` ",
        (err, rows) => {
            if (err) throw err;
            res.json(rows);
        }
    );
    conn.end();
};

exports.getUserBadge = function (req, res) {
    conn = connection();
    console.log("MySQL get user badge" + JSON.stringify(req.params));
    conn.query(
        "SELECT r.`rank` FROM `rank_prediction` rp JOIN `rank` r ON r.`id` = rp.`rank` WHERE rp.`student_id`= ?",
        [req.params.id],
        (err, rows) => {
            if (err) {
                console.log("Cannot connect to get user badge");
                throw err;
            }

            res.json(rows);
        }
    );
    conn.end();
};

exports.getBadgeList = function (req, res) {
    conn = connection();
    console.log("MySQL get user badge list" + JSON.stringify(req.params));
    conn.query(
        "SELECT rp.`student_id`, rp.`rank` FROM `rank_prediction` rp ",
        (err, rows) => {
            if (err) {
                console.log("Cannot connect to get user badge");
                throw err;
            }

            res.json(rows);
        }
    );
    conn.end();
};
