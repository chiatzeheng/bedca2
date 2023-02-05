import React from "react";
import Carousel from "./components/carousel";
import "./index.css";
// import AddActor from "./pages/AddActor";
// import AddCustomer from "./pages/AddCustomer";
// import FilmDetails from "./pages/FilmDetails";
// import Login from "./pages/Login";
import Home from "./components/home";
// import Register from "./pages/Register";
// import Transactions from "./pages/Transactions";

// function App() {
//   const { loadUser, state } = useGlobalContext();
//   const { loading, is_authenticated } = state;
//   const location = useLocation();

//   React.useEffect(() => {
//     loadUser();
//   }, [loadUser, location]);

//   const sharedRoutes = React.useMemo(() => {
//     return [
//       {
//         path: "/",
//         component: Home,
//       },
//       {
//         path: "/films/:slug",
//         component: FilmDetails,
//       },
//     ];
//   }, []);

//   const authenicatedRoutes = React.useMemo(() => {
//     return [
//       {
//         path: "/add/actor",
//         component: AddActor,
//       },
//       {
//         path: "/add/customer",
//         component: AddCustomer,
//       },
//       {
//         path: "/transactions",
//         component: Transactions,
//       },
//       {
//         path: "*",
//         component: function RedirectToHome() {
//           return window.location.replace("/");
//         },
//       },
//       ...sharedRoutes,
//     ];
//   }, []);

//   const publicRoutes = React.useMemo(() => {
//     return [
//       {
//         path: "/login",
//         component: Login,
//       },
//       {
//         path: "/register",
//         component: Register,
//       },
//       {
//         path: "*",
//         component: function RedirectToLogin() {
//           return window.location.replace("/login");
//         },
//       },
//       ...sharedRoutes,
//     ];
//   }, []);

//   if (loading) {
//     return null;
//   }

//   return (
//     <>
//       <Navbar />
//       {(() => {
//         const currentRoute = is_authenticated
//           ? authenicatedRoutes
//           : publicRoutes;

//         for (let i = 0; i < currentRoute.length; i++) {
//           const { path, component: Component } = currentRoute[i];
//           if (location.pathname.match(path)) {
//             return <Component />;
//           }
//         }
//       })()}
//     </>
//   );
// }

function App() {
  return(
    <>
    {/* <Carousel/> */}
    <Home/>
    
    </>
  )
}

export default App;
