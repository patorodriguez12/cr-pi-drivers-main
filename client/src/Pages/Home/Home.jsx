import React from "react";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import Nav from "../../Components/Nav/Nav";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Footer from "../../Components/Footer/Footer";
import "./Home.css";

function Home() {
  return (
    <div className="homeContainer">
      <Nav />
      <section className="content">
        <Sidebar />
        <CardsContainer />
      </section>
      <Footer />
    </div>
  );
}

export default Home;
