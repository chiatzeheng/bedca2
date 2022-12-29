//DIT-FT-1B09
//2227861
//Timothy Chia 
const db = require("./db.js");

let User = {
  getActor: async (user_id) => {
    //async await query to get the user with the id
    return await db.query("SELECT actor_id, first_name, last_name FROM actor WHERE actor_id = ?;",[user_id] );
  },

  getActors: async (limit, offset) => {
  //async await query to get all the users id, first name and last name offset and limit
    return await db.query("SELECT actor_id, first_name, last_name FROM actor LIMIT ? OFFSET ?;",[limit, offset]);
  },
 
  postActor: async (first_name, last_name) => {
    console.log(first_name, last_name)
    //async query that inserts a new actor into the database
    return await db.query("INSERT INTO actor (first_name, last_name) VALUES (?, ?);",[first_name, last_name]);
  },

  putActor: async (first_name, last_name, default_first, default_last, id) => {
    //async query that updates an actor's details
    return await db.query("UPDATE ACTOR SET first_name = coalesce(?, ?), last_name = coalesce(?, ?) WHERE actor_id = ?",[first_name,  default_first, last_name, default_last,id]);
    
  },

  deleteActor: async (id) => {
    //async query that deletes actor from database 
    await db.query("DELETE FROM film_actor WHERE actor_id = ?",[id]);
    return await db.query("DELETE FROM actor WHERE actor_id = ?",[id]);
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
    await db.query( "INSERT INTO customer (store_id, first_name, last_name, email, address_id) VALUES (?,?,?,?,?); ",[store_id, first_name, last_name, email, address_id]);
    return await db.query("SELECT customer_id FROM customer WHERE address_id= ?", [address_id]);
  },

  postAddress: async (
    address_line1,
    address_line2,
    district,
    city_id,
    postal_code,
    phone
  ) => {
        //async query that inserts a new address into the database
    return await db.query(
      "INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES (?,?,?,?,?,?)",
      [address_line1, address_line2, district, city_id, postal_code, phone]
    );
  },
  checkEmail: async (email) => {
    //async query that checks if email exists in database
    return await db.query("SELECT email FROM customer WHERE email = ?", [
      email,
    ]);
  },
  postFilm: async (title,description,release_year, language_id,rental_duration,rental_rate, length,replacement_cost, rating,special_features) => {
    //async query that returns all the categories for a film
    return await db.query("INSERT INTO film (title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features) VALUES (?,?,?,?,?,?,?,?,?,?)",[title,description,release_year, language_id,rental_duration,rental_rate, length,replacement_cost, rating,special_features]);
  },
  putFilm: async (title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features, default_title, default_description, default_release_year, default_language_id, default_rental_duration, default_rental_rate, default_length, default_replacement_cost, default_rating, default_special_features, id) => {
    //async query that updates a film's details
    return await db.query("UPDATE FILM SET title = coalesce(?, ?), description = coalesce(?, ?), release_year = coalesce(?, ?), language_id = coalesce(?, ?), rental_duration = coalesce(?, ?), rental_rate = coalesce(?, ?), length = coalesce(?, ?), replacement_cost = coalesce(?, ?), rating = coalesce(?, ?), special_features = coalesce(?, ?) WHERE film_id = ?",[title, default_title, description, default_description, release_year, default_release_year, language_id, default_language_id, rental_duration, default_rental_duration, rental_rate, default_rental_rate, length, default_length, replacement_cost, default_replacement_cost, rating, default_rating, special_features, default_special_features, id]);
  },
  getFilms: async (id) => {
    //async query that returns all the categories for a film
    return await db.query("SELECT * FROM film WHERE film_id =?",[id]);
  },
  getCity: async (city) => {
    //async query that checks if city exists in database
    return await db.query("SELECT country_id, city FROM city WHERE city = ?", [city])
   },
   getCountry: async (country) => {
    //async query that checks if country exists in database
    return await db.query("SELECT country_id, country FROM country WHERE country = ?", [country])
    },
  postCity: async (city, id) => {
    //async query that inserts a new country and city into the database
    return await db.query("INSERT INTO city (city, country_id) VALUES(?, ?)", [city, id])
  },
  postCountry: async (country) => {
    return await db.query("INSERT INTO country (country) VALUES(?)", [country])
  },
  getCountryById: async(id) => {
    return await db.query("SELECT country_id, country FROM country WHERE country_id = ?", [id])
  },
};

module.exports = User;
