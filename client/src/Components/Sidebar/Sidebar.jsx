import React from "react";
import Filters from "../Filters/Filters";
import { Box, Paper } from "@mui/material";

function Sidebar() {
  return (
    <Box
      sx={{
        width: "20%",
        padding: 2,
        backgroundColor: "background.paper",
        boxShadow: 3,
      }}
    >
      <Filters />
    </Box>
  );
}

export default Sidebar;
