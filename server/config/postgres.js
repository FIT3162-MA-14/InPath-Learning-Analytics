const Pool = require("pg").Pool;

//connect to postgre
// var connectionString =
//     "postgres://postgres:Chewk@i1@34.87.16.8:15432/discourse";
// var pgClient = new pg.Client(connectionString);
// pgClient.connect((err) => {
//     if (err) throw err;
//     else {
//         console.log("Connected to PostgreSQL database!");
//     }
// });

const connection = () => {
    const pool = new Pool({
        user: "postgres",
        host: "34.87.16.8",
        database: "discourse",
        password: "Chewk@i1",
        port: 15432,
    });

    pool.on("error", (err, client) => {
        console.error("Unexpected error on idle client", err);
        process.exit(-1);
    });
    return pool;
};

// Number of Posts by Week (Total)
exports.getAllPost = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT date_part('week', created_at) AS Week, Count(topics.id) AS Total FROM public.topics WHERE '20200803' <= created_at AND created_at < '20201130' GROUP BY Week ORDER BY Week;",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// "MY" Number of Posts by Week
exports.getUserPostWeek = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT date_part('week', created_at) AS Week, Count(topics.id) AS Total FROM public.topics WHERE '20200803' <= created_at AND created_at < '20201130' AND user_id = $1 GROUP BY Week ORDER BY Week;",
            [req.params.id],
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// Number of Replies by Week (Total)
exports.getAllReply = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT date_part('week', created_at) AS Week, Count(posts.id) AS Total FROM public.posts WHERE '20200803' <= created_at AND created_at < '20201130' AND post_number != 0 GROUP BY Week ORDER BY Week;",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// "MY" Number of Replies by Week
exports.getUserReplyWeek = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT date_part('week', created_at) AS Week, Count(posts.id) AS Total FROM public.posts WHERE '20200803' <= created_at AND created_at < '20201130' AND user_id = $1 AND post_number != 0 GROUP BY Week ORDER BY Week;",
            [req.params.id],
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// "MY" number of post per category
exports.getUserPerCat = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT y.cat_name, COUNT(y.topic_id) from(SELECT  t.id as topic_id, t.category_id as cat_id, c.name as cat_name FROM public.topics t JOIN public.categories c ON t.category_id = c.id WHERE t.user_id = $1 GROUP BY t.id, t.category_id, c.name ORDER BY t.id ASC) y GROUP BY y.cat_name, y.cat_id;",
            [req.params.id],
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// Total post per category
exports.getAllPerCat = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT y.cat_name, COUNT(y.topic_id) from(SELECT  t.id as topic_id, t.category_id as cat_id, c.name as cat_name FROM public.topics t JOIN public.categories c ON t.category_id = c.id GROUP BY t.id, t.category_id, c.name ORDER BY t.id ASC) y GROUP BY y.cat_name, y.cat_id;",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// Highest Number of Post
exports.getMaxPost = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT MAX(x.post_no) FROM (SELECT COUNT(posts.id) AS post_no FROM public.posts WHERE post_number = 0 GROUP BY user_id) x;",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// "MY" number of Post
exports.getUserPost = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT COUNT(posts.id) FROM public.posts WHERE post_number = 0 AND user_id= $1 GROUP BY user_id;",
            [req.params.id],
            (err, rows) => {
                done();
                if (err) {
                    console.log("Cannot connect to get user own post count");
                    throw err;
                }
                res.json(rows.rows);
            }
        );
    });
    conn.end();
};

// "MY" number of replies
exports.getUserReply = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;

        client.query(
            "SELECT COUNT(posts.id) FROM public.posts WHERE post_number != 0 AND user_id= $1 GROUP BY user_id;",
            [req.params.id],
            (err, rows) => {
                done();
                if (err) {
                    console.log("Cannot connect to get user own reply count");
                    throw err;
                }
                res.json(rows.rows);
            }
        );
    });
    conn.end();
};

// "MY" number of Post read
exports.getUserRead = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT user_stats.posts_read_count FROM public.user_stats WHERE user_id= $1;",
            [req.params.id],
            (err, rows) => {
                done();
                if (err) {
                    console.log("Cannot connect to get user own read count");
                    throw err;
                }
                res.json(rows.rows);
            }
        );
    });
    conn.end();
};

// "MY" number of likes received
exports.getUserLike = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT user_stats.likes_received FROM public.user_stats WHERE user_id= $1;",
            [req.params.id],
            (err, rows) => {
                done();
                if (err) {
                    console.log("Cannot connect to get user own likes count");
                    throw err;
                }
                res.json(rows.rows);
            }
        );
    });
    conn.end();
};

// "MY" number of days visited
exports.getUserDay = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT user_stats.days_visited FROM public.user_stats WHERE user_id= $1;",
            [req.params.id],
            (err, rows) => {
                done();
                if (err) {
                    console.log("Cannot connect to get user own days visited");
                    throw err;
                }
                res.json(rows.rows);
            }
        );
    });
    conn.end();
};

// "MY" number of word
exports.getUserWord = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "select sum(word_count) from posts where user_id=$1",
            [req.params.id],
            (err, rows) => {
                done();
                if (err) {
                    console.log("Cannot connect to get user own days visited");
                    throw err;
                }
                res.json(rows.rows);
            }
        );
    });
    conn.end();
};

// Highest Number of Replies
exports.getMaxReply = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT MAX(x.post_no) FROM (SELECT COUNT(posts.id) AS post_no FROM public.posts WHERE post_number > 0 GROUP BY user_id) x;",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// Highest Number of Words
exports.getMaxWord = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT MAX(x.words) FROM (SELECT SUM(posts.word_count) AS words FROM public.posts GROUP BY user_id) x;",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// Highest Days Spent
exports.getMaxDay = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT MAX(user_stats.days_visited) from public.user_stats;",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// Highest Message Read
exports.getMaxRead = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT MAX(user_stats.posts_read_count) from public.user_stats;",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// Highest Likes Received
exports.getMaxLike = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "SELECT MAX(user_stats.likes_received) from public.user_stats;",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// User_id + number of posts
exports.getPostList = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "select user_id, topic_count from user_stats",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// User_id + number of replies
exports.getReplyList = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "select user_id, abs(post_count - topic_count) as reply_count from user_stats",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// User_id + number of posts read
exports.getReadList = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "select user_id, posts_read_count from user_stats",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// User_id + number of days visited
exports.getDayList = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "select user_id, days_visited from user_stats",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// User_id + number of likes received
exports.getLikeList = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "select user_id, likes_received from user_stats",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};

// User_id + number of word count
exports.getWordList = function (req, res) {
    conn = connection();
    conn.connect((err, client, done) => {
        if (err) throw err;
        client.query(
            "select user_id, sum(word_count) as word_count from posts group by user_id order by user_id",
            (err, rows) => {
                done();
                if (err) throw err;
                else {
                    res.json(rows.rows);
                }
            }
        );
    });
    conn.end();
};
