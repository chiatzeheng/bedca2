import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import { useGlobalContext } from "../context";


const Navbar = (props) => {
  const { logOut, state, setAlert } = useGlobalContext();
  const { is_authenticated } = state;

  const authenticated_titles = React.useMemo(() => {
    return (
      <div className="flex gap-4 items-center">
        {state.user && (
          <>
            <Link className="btn btn-sm btn-secondary" to="/add/actor">
              Add actor
            </Link>
            <Link className="btn btn-sm btn-secondary" to="/add/customer">
              Add customer
            </Link>
            <Link className="btn btn-outline btn-sm" to="/transactions">
              Transactions
            </Link>
          </>
        )}
        <ArrowLeftOnRectangleIcon
          className="h-6 w-6 cursor-pointer float-anim"
          onClick={logOut}
        />
      </div>
    );
  }, []);
  const unauthenticated_titles = React.useMemo(() => {
    return (
      <div className="flex gap-4 items-center">
        <Link to="/login" className="btn btn-outline btn-sm">
          Login
        </Link>
      </div>
    );
  }, []);

  return (
    <nav className="text-white items-center py-6 px-12 font-inter gap-6 flex">
      <Link
        to="/"
        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        BED DVD
      </Link>
      
      <div className="ml-auto">
        {is_authenticated ? authenticated_titles : unauthenticated_titles}
      </div>
    </nav>
  );
};

export default Navbar;
