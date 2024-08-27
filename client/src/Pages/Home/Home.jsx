import React from "react";
import Cards from "../../Components/CardsContainer/Cards";
import Nav from "../../Components/Nav/Nav";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Footer from "../../Components/Footer/Footer"
import style from "./Home.css";

function Home() {

  return (
    <div className="homeContainer">
      <Nav />
      <section className="content">
        <Sidebar />
        <Cards />
      </section>
      <Footer />
    </div>
  );
}

export default Home;
