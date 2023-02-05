//DIT-FT-1B09
//2227861
//Timothy Chia 
const mysql = require("mysql2/promise");
//Using mysql2 in order to perform async/await queries
let connection;
//My connections details

try {
  connection = mysql.createPool({
    host: "localhost",
    user: "BED_DVD_ROOT",
    password: "pa$$woRD123",
    database: "BED_DVD_DB",
  });
  console.log("connected")
} catch (error) {
  console.log(error);
}

//Exporting the connection so that it can be used in other files
module.exports = connection;
