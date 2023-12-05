const mysql = require("mysql2");


const sqldb = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  });
  sqldb.connect((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Connection established");
    }
  });

  module.exports = sqldb;