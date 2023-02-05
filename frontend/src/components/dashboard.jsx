import { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import FilmCards from "../cards";
import { AiOutlineClose } from "react-icons/ai";

const Dashboard = () => {
    const { fetchFilmData, filmData } = useAuth();
    const inputRef = useRef(null);
    const selectRef = useRef(null);
    const [isFetched, setIsFetched] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [maxPrice, setMaxPrice] = useState(5);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentItems, setCurrentItems] = useState([]);

    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);

    const handlePaginationNext = () => {
        setPage((page) => page + 1);
        setOffset((offset) => offset + 6);
    };

    const handlePaginationPrevious = () => {
        if (page == 1) {
            return;
        } else {
            setPage((page) => page - 1);
            setOffset((offset) => offset - 6);
        }
    };

    const handleSearch = (e) => {
        setPage(1);
        setOffset(0);
        setSearchTerm(e.target.value);
    };

    const handleSelect = (e) => {
        setPage(1);
        setOffset(0);
        if (e.target.value === "All") {
            setSelectedCategory("");
        } else {
            setSelectedCategory(e.target.value);
        }
    };

    const onClear = () => {
        setPage(1);
        setOffset(0);
        setSearchTerm("");
        setSelectedCategory("");
        inputRef.current.value = "";
        selectRef.current.options[0].selected = true;
    };

    const fetchFilmCategories = async () => {
        const response = await fetch(`http://localhost:3000/films/categories`);
        const data = await response.json();
        setCategories(data);
    };

    useEffect(() => {
        if (filmData) {
            setCurrentItems(filmData);
        }
    }, [filmData]);

    useEffect(() => {
        fetchFilmCategories();
    }, []);

    useEffect(() => {
        fetchFilmData(searchTerm, null, selectedCategory, offset, maxPrice).then(() =>
            setIsFetched(true)
        );
    }, [searchTerm, selectedCategory, offset]);

    if (!isFetched) {
        return <></>;
    } else {
        return (
            <div className="flex flex-col justify-center gap-8">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search film"
                        ref={inputRef}
                        className="input input-bordered w-full max-w-xs ml-12"
                        onChange={handleSearch}
                    />
                    <select
                        ref={selectRef}
                        onChange={handleSelect}
                        className="select select-bordered w-full max-w-[10rem]"
                    >
                        <option selected>All</option>
                        {categories.map((category) => (
                            <option key={category.category_id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex flex-col">
                        <label className="">Max Price: ${maxPrice}</label>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={maxPrice}
                            class="range range-primary"
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                    <button
                        type="reset"
                        className="btn btn-square"
                        onClick={onClear}
                    >
                        <AiOutlineClose size={24} className="text-error" />
                    </button>
                </div>

                {filmData.length === 0 && (
                    <h1 className="text-error font-bold ml-12">
                        No results found
                    </h1>
                )}
                <FilmCards currentItems={currentItems} />
                <p className="self-center">Page {page}</p>
                <div className="btn-group self-center">
                    <button
                        onClick={() => handlePaginationPrevious()}
                        className="btn btn-secondary w-[10rem]"
                    >
                        Previous page
                    </button>
                    <button
                        onClick={() => handlePaginationNext()}
                        className="btn btn-primary w-[10rem]"
                    >
                        Next Page
                    </button>
                </div>
            </div>
        );
    }
};

export default Dashboard;