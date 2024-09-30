import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#22092C",
        color: "white",
        padding: 2,
        textAlign: "center",
        marginTop: "auto",
        
      }}
    >
      <Typography variant="body1">
        Developed by{" "}
        <Link to="https://www.linkedin.com/in/hugo-patricio-rodriguez-a361a7108/" style={{textDecoration: "none", display: "inline-block", color: "#FF9209"}}>
          Patricio Rodriguez
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
