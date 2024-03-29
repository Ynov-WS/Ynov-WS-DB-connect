var mysql = require('mysql');

var con = mysql.createConnection({
    host: "mysql-2a07a4b1-tommosti1-4299.a.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_mzPQUk6FcF5kmxS9Dcq",
    database: "defaultdb",
    port:23244
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});