const mysql = require("mysql2");

const db_connection = mysql
    .createConnection({
        host: "13.213.240.136", // HOST NAME
        user: "root", // USER NAME
        database: "auth_api", // DATABASE NAME
        password: "Chewk@i1", // DATABASE PASSWORD
    })
    .on("error", (err) => {
        console.log("Failed to connect to Database - ", err);
    });
module.exports = db_connection;
