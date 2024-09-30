import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import Form from "../Form/Form";

function Nav({ setCurrentPage }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#E10600",
        }}
      >
        <Box sx={{ display: "flex"}}>
          <Box component={Link} to="/home" sx={{ marginRight: 2 }}>
            <img
              src={"/assets/f1-logo.png"}
              alt="Logo"
              style={{ width: "120px", height: "35px", color: "#EEEEEE" }}
            />
          </Box>
        </Box>



        <SearchBar setCurrentPage={setCurrentPage} />

        <Button
          variant="contained"
          onClick={toggleForm}
          sx={{ backgroundColor: "tertiary.main", color: "text.main", marginLeft: 2 }}
        >
          Create new driver
        </Button>
      </Toolbar>

      {isFormOpen && <Form closeForm={toggleForm} />}
    </AppBar>
  );
}

export default Nav;
