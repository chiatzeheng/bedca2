

  const Router = require("express").Router;
  const jwt = require("jsonwebtoken");
  const auth = require("./protectedRoutes.js");
  const db = require("../model/db.js");
  const router = Router();

  let jwt_secret = "timothy";

  router.get("/users/username", auth, (req, res) => {
    try {
      if (req.user) {
        return res.status(200).json(req.user);
      }
    } catch (error) {
      res.status(500).send("server error");
    }
  });

  router.post("/register", async (req, res) => {
    try {
      const { username, password, confirmPassword } = req.body;

      if (!username) {
        return res.status(400).json({ error: "Invalid Username" });
      }

      if (!password) {
        return res.status(400).json({ error: "Invalid Password" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      const existingUser = await db.query("SELECT * FROM Users WHERE username = ?", username);

      if (existingUser.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      const results = await db.query("INSERT INTO Users (username, password) VALUES (?, ?)", [username, password]);
      const payload = {
        user: {
          id: results.insertId,
        },
      };
      jwt.sign( payload, jwt_secret, { expiresIn: 1000000000  }, (err, token) => { if (err) throw err; return res.json({ token }); } );
    } catch (error) {
      console.error(error);
      res.status(500).send("server error");
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!password || password.length < 8 || password.length > 20) {
      return res.status(400).json({ error: "Password must be between 8 and 20 characters" });
    }

    try {
      const response = await db.query("SELECT * FROM staff WHERE email=?", [email]);

      if (response.length == 0) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      if (response[0].password == password) {
        const payload = {
          user: {
            id: response[0].staff_id,
          },
        };
          jwt.sign( payload, jwt_secret, { expiresIn: 1000000000 }, (err, token) => {
              if (err) throw err; return res.json({ token }); 
          } );
          } else {
            return res
              .status(400)
              .json({ errors: [{ msg: "Invalid email or password!" }] });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send("Internal Server Error");
        }
      });
      
  module.exports = router;
      
