const express = require("express");
const userDB = require("../model/actors.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoint 1
app.get("/actors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [q] = await userDB.getActor(id);
    q.length != 0 ? res.status(200).send(q) : res.send(null);
  } catch (error) {
    res.send({ error_msg: "Internal server error" });
  }
});

//endpoint 2
app.get("/actors", async (req, res) => {
  let { limit, offset } = req.query;
  limit = limit ? limit : 20;
  offset = offset ? offset : 0;

  // try {
    const q = await userDB.getActorsByName(limit, offset);
    q.length != 0 ? res.status(200).send(q) : res.send(null);
  // } catch (error) {
  //   res.send({ error_msg: "Internal server error" });
  // }
});

//endpoint 3
app.post("/actors", async (req, res) => {
  const { first_name, last_name } = req.body;
  if (first_name && last_name) {
    try {
      const q = await userDB.postActor(first_name, last_name);
      res.status(201).send({ actor_id: q[0].insertId });
    } catch (error) {
      res.status(500).send({ error_msg: "Internal server error" });
    }
  } else {
    res.status(400).send({ error_msg: "missing data" });
  }
});

//endpoint 4
app.put("/actors/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;

  if (first_name && last_name) {
    try {
      const q = await userDB.putActor(first_name, last_name, id);
      q.affectedRows != 0
        ? res.status(200).send({ success_msg: "record updated" })
        : res.status(204).send({ error_msg: "Actor not found" });
    } catch (error) {
      res.status(500).send({ error_msg: "Internal server error" });
    }
  } else {
    res.status(400).send({ error_msg: "missing data" });
  }
});
//endpoint 5
app.delete("/actors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const q = await userDB.deleteActor(id);
    q.affectedRows != 0
      ? res.status(200).send({ success_msg: "record deleted" })
      : res.status(204).send({ error_msg: "Actor not found" });
  } catch (error) {
    res.status(500).send({ error_msg: "Internal server error" });
  }
});
//endpoint 6

app.get("/film_categories/:id/films", async (req, res) => {
  const { id } = req.params;
  try {
    const q = await userDB.getFilms(id);
    q.length != 0 ? res.status(200).send(q) : res.send([]);
  } catch (error) {
    res.send({ error_msg: "Internal server error" });
  }
});

//endpoint 7

//Return the payment detail of a customer between the provided period.
app.get("/payment/:id?", async (req, res) => {
  const { id } = req.params;
  const { start_date, end_date } = req.query;
  
  console.log(start_date)
  try {
    const q = await userDB.getPayments(id, start_date, end_date);
    q.length != 0 ? res.status(200).send(q[0]) : res.send([]);
  } catch (error) {
    res.status(500).send({ error_msg: "Internal server error" });
  }
});

//endpoint 8
//Add a new customer to the database (note: customer’s email address is unique)

app.post("/customers", async (req, res) => {
  const {store_id, first_name, last_name, email, address } = req.body;
  const {address_line1, address_line2, district, city_id, postal_code, phone} = address;

    if (store_id, first_name && last_name && email && address) {
      try {
        const q2 = await userDB.postAddress(address_line1, address_line2, district, city_id, postal_code, phone);
        const email_check = await userDB.checkEmail(email);
        console.log(email_check[0].email)
        if(email_check[0].email == null || undefined){
          const q = await userDB.postCustomer(store_id, first_name, last_name, email, q2[0].insertId);
          res.status(201).send({ customer_id: q[0].insertId });
        }
        else{
          res.status(409).send({ error_msg: "email already exists" });
        }
      } catch (error) {
        res.status(500).send({ error_msg: "Internal server error" });
      }
    } else {
      res.status(400).send({ error_msg: "missing data" });
    }
});

module.exports = app;
