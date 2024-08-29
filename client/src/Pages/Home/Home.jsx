import React, { useState } from "react";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import Nav from "../../Components/Nav/Nav";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Footer from "../../Components/Footer/Footer";
import "./Home.css";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="homeContainer">
      <Nav setCurrentPage={setCurrentPage}/>
      <section className="content">
        <Sidebar />
        <CardsContainer
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
      <Footer />
    </div>
  );
}

export default Home;
