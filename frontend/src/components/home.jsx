import React, { useEffect } from "react";
import axios from "axios";
import useTimer from "../externals/timer";
import SearchBar from "./searchbar";
import Cards from "./cards";

let eachPage = 6;

const Home = (props) => {
  const [page, setPage] = React.useState(1);
  const [films, setFilms] = React.useState([]);

  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [rentalRate, setRentalRate] = React.useState("");
  const searchTime = useTimer(search, 500);
  const rentalSearchTime = useTimer(rentalRate, 500);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/films?per_page=${eachPage}&page=${page}&search=${searchTime}&category=${category}&rental_rate=${rentalSearchTime}`
      );
      setFilms(response.data);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    setPage(1);
  }, [searchTime, category]);

  return (
    <>
      <main className="px-12 pb-6">
        <SearchBar
          category={category}
          search={search}
          setSearch={setSearch}
          setCategory={setCategory}
          rentalRate={rentalRate}
          setRentalRate={setRentalRate}
        />
        <div className="shadow-xl grid mt-6 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-cols-1">
          {films.length === 0 && (
            <h1 className="font-bold text-2xl">No results!</h1>
          )}
          {films.map((film) => {
            return <Cards key={film.id} film={film} />;
          })}
        </div>
        <div className="btn-group mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(1)}
            className="btn"
          >
            «
          </button>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="btn"
          >
            {"<"}
          </button>

          <button onClick={() => setPage(1)} className="btn">
            Page {page} / {1000 / eachPage}
          </button>
          <button
            disabled={page === 1}
            onClick={() => setPage(page + 1)}
            className="btn"
          >
            {">"}
          </button>
          <button
            disabled={page === 1}
            onClick={() => setPage(1000 / eachPage)}
            className="btn"
          >
            »
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
