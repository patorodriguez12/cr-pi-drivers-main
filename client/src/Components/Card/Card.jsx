import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";

function Cards({ driver }) {
  return (
    <Link to={`/detail/${driver.id}`} style={{ textDecoration: "none" }}>
      <Card
        container
        sx={{
          maxWidth: 330,
          height: 350,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-10px)",
          },
          backgroundColor: "tertiary.main",
        }}
      >
        <CardContent sx={{ padding: "1px" }}>
          <CardMedia
            component="img"
            image={driver.image}
            alt={driver.forename}
            height={260}
            sx={{ width: "100%", height: "260px", objectFit: "cover" }}
          />
          <CardHeader
            title={`${driver.forename} ${driver.surname}`}
            subheader={driver.nationality}
            sx={{ textAlign: "center" }}
          />
        </CardContent>
      </Card>
    </Link>
  );
}

export default Cards;
