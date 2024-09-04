import React from "react";
import Filters from "../Filters/Filters";
import { Box, Paper } from "@mui/material";

function Sidebar() {
  return (
    <Box
      sx={{
        width: 250, // Ancho del sidebar
        padding: 2, // Espaciado interno
        backgroundColor: 'background.paper', // Color de fondo
        boxShadow: 3, // Sombra para darle profundidad
        // Agrega otras propiedades de estilo según tus necesidades
      }}
    >
      <Filters />
    </Box>
  );
}

export default Sidebar;

