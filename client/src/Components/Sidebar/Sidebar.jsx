import React from "react";
import Filters from "../Filters/Filters";
import { Box, Paper } from "@mui/material";

function Sidebar() {
  return (
    <Box
      sx={{
        width: "20%",
        padding: 5,
        backgroundColor: "#262626",
        boxShadow: 3,
      }}
    >
      <Filters />
    </Box>
  );
}

export default Sidebar;
