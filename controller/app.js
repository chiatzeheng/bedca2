//DIT-FT-1B09
//2227861
//Timothy Chia
const express = require("express");
const userDB = require("../model/actors.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoint 1
//to get a specific actor from actor table
app.get("/actors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [q] = await userDB.getActor(id);
    q.length != 0 && !isNaN(id)
      ? res.status(200).send(q)
      : res.status(204).send(null);
  } catch (error) {
    res.status(500).send({ error_msg: "Internal server error" });
  }
});

// endpoint 2
//to get all actors from actor table
app.get("/actors", async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = limit < 20 && limit > 0 ? parseInt(limit) : 20;
    offset = offset ? parseInt(offset) : 0;

    const [q] = await userDB.getActors(limit, offset);
    q.length != 0 ? res.status(200).send(q) : res.send(q);
  } catch (error) {
    res.status(500).send({ error_msg: "Internal server error" });
  }
});

//endpoint 3
//to post a new actor to actor table
app.post("/actors", async (req, res) => {
  const { first_name, last_name } = req.body;

  if (first_name && last_name && isNaN(first_name) && isNaN(last_name)) {
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
//to update an actor in actor table
app.put("/actors/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;

  try {
    let [[i]] = await userDB.getActor(id);

    if (i === undefined || i === null) {
      res.send({ error_msg: "Actor not found" });
    } else {
      let default_first = i.first_name;
      let default_last = i.last_name;

      if (first_name || last_name) {
        const [q] = await userDB.putActor(
          first_name,
          last_name,
          default_first,
          default_last,
          id
        );
        res.status(200).send({ success_msg: "record updated" });
      } else {
        res.status(400).send({ error_msg: "missing data" });
      }
    }
  } catch (error) {
    res.status(500).send({ error_msg: "Internal server error" });
  }
});

//endpoint 5
//to delete an actor from actor table
app.delete("/actors/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const [q] = await userDB.deleteActor(id);
    q.affectedRows != 0
      ? res.status(200).send({ success_msg: "record deleted" })
      : res.status(400).send({ error_msg: "Actor not found" });
  } catch (error) {
    res.status(500).send({ error_msg: "Internal server error" });
  }
});
//endpoint 6
//to get all films of a specific category
app.get("/film_categories/:id/films", async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id) || id === undefined || id === null)
      res.send({ error_msg: "Internal server error" });
    else {
      const [q] = await userDB.getFilms(id);
      res.status(200).send(q);
    }
  } catch (error) {
    res.send({ error_msg: "Internal server error" });
  }
});

//endpoint 7
//Return the payment detail of a customer between the provided period.
app.get("/customer/:id/payment", async (req, res) => {
  const { id } = req.params;
  const { start_date, end_date } = req.query;
  let sum = 0;
  let i = 0;

  try {
    const q = await userDB.getPayments(id, start_date, end_date);
    for (i; i < q[0].length; i++) {
      sum += parseFloat(q[0][i].amount);
    }
    if (q[0].length != 0 || !isNaN(id)) {
      res
        .status(200)
        .send({ rental: q[0], total: Math.round(sum * 100) / 100 });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(500).send({ error_msg: "Internal server error" });
  }
});

//endpoint 8
//Add a new customer to the database (note: customer’s email address is unique)
app.post("/customers", async (req, res) => {
  const { store_id, first_name, last_name, email, address } = req.body;
  const {
    address_line1,
    address_line2,
    district,
    city_id,
    postal_code,
    phone,
  } = address;



  if ((store_id, first_name && last_name && email && address)) {
    try {

      if(store_id > 2 || store_id < 1) {
        throw error
      }
      
      const q2 = await userDB.postAddress(
        address_line1,
        address_line2,
        district,
        city_id,
        postal_code,
        phone
      );
      if (
        (address_line1 && address_line2 && district,
        city_id,
        postal_code,
        phone)
      ) {
        const email_check = await userDB.checkEmail(email);
        if (email_check[0][0] == undefined || null) {
          const [[q]] = await userDB.postCustomer(
            store_id,
            first_name,
            last_name,
            email,
            q2[0].insertId
          );
          res.status(201).send({ customer_id: q.customer_id });
        } else {
          res.status(409).send({ error_msg: "email already exists" });
        }
      } else {
        throw error;
      }
    } catch (error) {
      res.status(500).send({ error_msg: "Internal server error" });
    }
  } else {
    res.status(400).send({ error_msg: "missing data" });
  }
});

//endpoint 9
//Create a new put req that creates a new film
app.put("/films", async (req, res) => {
  const {
    title,
    description,
    release_year,
    language_id,
    rental_duration,
    rental_rate,
    length,
    replacement_cost,
    rating,
    special_features,
    category_id,
  } = req.body;
  if (
    title &&
    description &&
    release_year &&
    language_id &&
    rental_duration &&
    rental_rate &&
    length &&
    replacement_cost &&
    rating &&
    special_features &&
    category_id
  ) {
    try {
      const q = await userDB.postFilm(
        title,
        description,
        release_year,
        language_id,
        rental_duration,
        rental_rate,
        length,
        replacement_cost,
        rating,
        special_features
      );
      const q2 = await userDB.postFilmCategory(q[0].insertId, category_id);
      res.status(201).send({ film_id: q[0].insertId });
    } catch (error) {
      res.status(500).send({ error_msg: "Internal server error" });
    }
  } else {
    res.status(400).send({ error_msg: "missing data" });
  }
});

module.exports = app;
