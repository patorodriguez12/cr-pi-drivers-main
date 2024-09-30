import React, { useState } from "react";
import CardList from "../../Components/CardList/CardList";
import Nav from "../../Components/Nav/Nav";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Footer from "../../Components/Footer/Footer";
import { Box } from "@mui/material";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Box sx={{
      backgroundColor: "#A9A9A9",
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}>
      <Nav setCurrentPage={setCurrentPage} />
      <Box sx={{display: "flex", flex: 1}}>
        <Sidebar />
        <CardList currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
