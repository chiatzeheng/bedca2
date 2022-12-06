const mysql = require("mysql2/promise");
//Using mysql2 in order to perform async/await queries
let connection;
//My connections details

try {
  connection = mysql.createPool({
    host: "localhost",
    user: "bed_dvd_root",
    password: "pa$$woRD123",
    database: "bed_dvd_db",
  });
  console.log("connected")
} catch (error) {
  console.log(error);
}

//Exporting the connection so that it can be used in other files
module.exports = connection;
