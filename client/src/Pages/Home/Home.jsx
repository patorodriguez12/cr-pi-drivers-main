import React, { useState } from "react";
import CardList from "../../Components/CardList/CardList";
import Nav from "../../Components/Nav/Nav";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Footer from "../../Components/Footer/Footer";
import { Box, Container, Grid2 } from "@mui/material";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Grid2
      sx={{
        backgroundImage: "url('assets/backgroundImage.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        minWidth: "100vh",
      }}
    >
      <Nav setCurrentPage={setCurrentPage} />
      <CardList currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Footer />
    </Grid2>
  );
}

export default Home;
