import React from "react";
import { Link } from "react-router-dom";


const Cards = ({film}) => {
  const url = film.film_title.toLowerCase().replace(/ /g, "-");

  const imageId = Math.floor(Math.random() * 1000);  // Generate a random number between 0 and 999
  const imageUrl = `https://source.unsplash.com/random/800x600/?film,${imageId}`;


  return (
  //   <div className="card bg-base-100 rounded-sm ring ring-primary shadow-xl">
  //   <div className="card-body">
  //     <h2 className="card-title">{film.film_title}</h2>
  //     <p className="text-sm">{film.film_description}</p>
  //     <div className="flex gap-2">
  //       <div className="badge badge-secondary">{film.category_name}</div>
  //       <div className="badge badge-primary badge-outline">{film.film_rating}</div>
  //     </div>
  //     <div className="card-actions mt-2 justify-start">
  //       <Link
  //         to={`/films/${url}`}
  //         className="btn btn-primary btn-sm rounded-sm"
  //       >
  //         View
  //       </Link>
  //     </div>
  //   </div>
  // </div>
  <div className="card w-96 rounded-lg bg-base-100 shadow-xl">
  <figure><img src={imageUrl} alt="Image" /></figure>
  <div className="card-body">
    <h2 className="card-title">
    {film.film_title}
      <div className="badge badge-secondary">{film.film_rating}</div>
    </h2>
    <p>{film.film_description}</p>
    <div className="card-actions mt-2 justify-start">
       <Link
         to={`/films/${url}`}
         className="btn btn-primary btn-sm rounded-sm"
       >
         View
       </Link>
     </div>
  </div>
</div>
  );
};

export default Cards;
