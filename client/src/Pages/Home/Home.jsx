import React, { useState } from "react";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import Nav from "../../Components/Nav/Nav";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Footer from "../../Components/Footer/Footer";
import { Box } from "@mui/material";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Box
      sx={{
        backgroundImage: "url('assets/backgroundImage.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav setCurrentPage={setCurrentPage} />
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexGrow: 1,
        }}
      >
        <Sidebar />
        <CardsContainer
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
