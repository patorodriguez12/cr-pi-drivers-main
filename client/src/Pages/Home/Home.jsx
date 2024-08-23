import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { allDrivers, allTeams } from "../../redux/actions";
import Cards from "../../Components/CardsContainer/Cards";
import Nav from "../../Components/Nav/Nav";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Paginator from "../../Components/Paginator/Paginator";
import Footer from "../../Components/Footer/Footer"
import style from "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.filteredData);

  // Escucha los cambios y los despacha
  useEffect(() => {
    dispatch(allDrivers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(allTeams());
  }, [dispatch]);

  return (
    <div className="homeContainer">
      <Nav />
      <section className="content">
        <Sidebar />
        <Cards drivers={drivers} />
      </section>
      {drivers.length > 0 ? <Paginator /> : <h1>Drivers not found</h1>}
    </div>
  );
}

export default Home;
