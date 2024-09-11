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
          backgroundColor: "primary.main", // Cambia el color del fondo si lo deseas
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            component={Link}
            to={`/`}
            sx={{
              color: "white", // Color del ícono o texto
              marginRight: 2,
            }}
          >
            🡰
          </IconButton>
        </Box>

        <SearchBar setCurrentPage={setCurrentPage} />

        <Button
          variant="contained"
          color="secondary"
          onClick={toggleForm}
          sx={{ marginLeft: 2 }}
        >
          Create new driver
        </Button>
      </Toolbar>

      {isFormOpen && <Form closeForm={toggleForm} />}
    </AppBar>
  );
}

export default Nav;
