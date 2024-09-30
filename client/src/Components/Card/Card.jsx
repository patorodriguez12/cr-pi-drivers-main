import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";

function Cards({ driver }) {
  return (
    <Link to={`/detail/${driver.id}`} style={{textDecoration: "none", display: "inline-block"}}>
      <Card
        sx={{
          width: 300,
          height: 350,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-10px)",
          },
          backgroundColor: "#2B2A4C",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ padding: "1px" }}>
          <CardMedia
            component="img"
            image={driver.image}
            alt={driver.forename}
            height={260}
          />
          <CardHeader
            title={`${driver.forename} ${driver.surname}`}
            subheader={driver.nationality}
            subheaderTypographyProps={{ style: { color: "#E10600" } }}
            sx={{ textAlign: "center", color: "#EEE2DE" }}
            
          />
        </CardContent>
      </Card>
    </Link>
  );
}

export default Cards;
