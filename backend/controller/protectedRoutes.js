

const jwt = require("jsonwebtoken");
const db = require("../model/db.js");

let jwt_secret = "timothy";

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (token) {  ``
      token = token.replace("Bearer ", "");

      const payload = await jwt.verify(token, jwt_secret);
      
      if (payload) {
        let q = "SELECT * FROM staff WHERE staff_id=?"
        const user = await db.query(q, [ payload.user.id, ]);
        req.user = user[0];
        next();
      }
    } else {
      console.log("no token");
      return res.status(403).send("no token");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("invalid token");
  }
};

module.exports = auth;