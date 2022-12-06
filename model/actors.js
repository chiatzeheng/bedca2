const db = require("./db.js");

let User = {
  getActor: async (user_id) => {
    //async/await query to get the user with the id
    return await db.query("SELECT actor_id, first_name, last_name FROM actor WHERE actor_id = ?",[user_id] );
  },
  getActorsByName: async (limit, offset) => {
    //async/await query to get the user with the id
    return await db.query("SELECT actor_id, first_name, last_name FROM actor ORDER BY first_name (LIMIT, OFFSET) VALUES (?, ?)",    [limit, offset]);
  },

  postActor: async (first_name, last_name) => {
    //async query that inserts a new actor into the database
 return await db.query("INSERT INTO actor (first_name, last_name) VALUES (?, ?)",[first_name, last_name]);
  },
  getActors: async (limit, offset) => {
    //async query that returns all the actors from the database
    return await db.query("SELECT actor_id, first_name, last_name FROM actor LIMIT ? OFFSET ?",[limit, offset] );
  },
  putActor: async (first_name, last_name, id) => {
    //async query that updates an actor's details
    return await db.query("UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?",[first_name, last_name, id]);
  },
  deleteActor: async (id) => {
    //async query that deletes an actor from the database
    return await db.query("DELETE FROM actor WHERE actor_id = ?", [id]);
  },
  getFilms: async (id) => {
    //async query that returns all the categories for a film
    return await db.query("SELECT f.film_id, c.name ,f.title, f.rating, f.release_year, f.rental_duration FROM film f JOIN film_category fc ON fc.film_id=f.film_id JOIN category c ON c.category_id=fc.category_id WHERE c.category_id = ?",[id]
    );
  },
  getPayments: async (id, start_date, end_date) => {
    //async query that returns all the categories for a film
    return await db.query( "select f.title, p.amount, p.payment_date from payment p join rental r on p.rental_id = r.rental_id join inventory i on r.inventory_id = i.inventory_id join film f on i.film_id = f.film_id where p.customer_id = ? AND p.payment_date > ? AND  p.payment_date < ?",[id, start_date, end_date])
  },
  postCustomer: async (store_id, first_name, last_name, email, address_id) => {
    //async query that inserts a new actor into the database
    return await db.query(
      "INSERT INTO customer (store_id, first_name, last_name, email, address_id) VALUES (?,?,?,?,?); ",
      [store_id, first_name, last_name, email, address_id]
    );
  },
  postAddress: async (
    address_line1,
    address_line2,
    district,
    city_id,
    postal_code,
    phone
  ) => {
    return await db.query(
      "INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES (?,?,?,?,?,?)",
      [address_line1, address_line2, district, city_id, postal_code, phone]
    );
  },
  checkEmail: async (email) => {
    return await db.query("SELECT email FROM customer WHERE email = ?", [
      email,
    ]);
  },
};

module.exports = User;
