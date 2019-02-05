const mysql = require("mysql");
require("dotenv").config();

let db;

if (process.env.JAWSDB_URL) {
  db = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
   db = mysql.createConnection({
    host: process.env.rootHost,
    port: process.env.rootPort,
    user: process.env.rootName,
    password: process.env.rootPassword,
    database: process.env.rootDB
  });
}

db.connect(function (err) {
  if (err) throw err;
  console.log("You are connected in thread id: ", db.threadId);

})

module.exports = db;