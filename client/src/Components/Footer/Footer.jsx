import React from "react";
import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        padding: 2,
        textAlign: "center",
        position: "relative",
        bottom: 0,
        width: "100%",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="body2" color="tertiary.main">
        © 2024 Your Company Name
      </Typography>
      <Typography variant="body2" color="tertiary.main">
        <Link href="#" color="inherit" sx={{ mx: 1 }}>
          Privacy Policy
        </Link>
        |
        <Link href="#" color="inherit" sx={{ mx: 1 }}>
          Terms of Service
        </Link>
      </Typography>
      <Typography variant="body2" color="tertiary.main">
        Follow us:
        <Link href="#" color="inherit" sx={{ mx: 1 }}>
          Facebook
        </Link>
        |
        <Link href="#" color="inherit" sx={{ mx: 1 }}>
          Twitter
        </Link>
        |
        <Link href="#" color="inherit" sx={{ mx: 1 }}>
          Instagram
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
