import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

function Cards({ driver }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 345,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-10px)",
          "& .see-more-button": {
            opacity: 1,
            visibility: "visible",
          },
        },
        backgroundColor: "tertiary.main",
      }}
    >
      <CardContent
        container
        sx={{ padding: "2px", alignItems: "center"}}
      >
        <CardMedia
          component="img"
          image={driver.image}
          height={230}
          alt={driver.forename}
        />
        <Typography variant="h5" component="div">
          {driver.forename} {driver.surname}
        </Typography>
        <Typography variant="body2">{driver.nationality}</Typography>
      </CardContent>
      <CardActions>
        <a
          href={`https://external-link.com/driver/${driver.id}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            className="see-more-button"
            sx={{
              color: "#007bff",
              transition: "opacity 0.3s",
              opacity: 0,
              visibility: "hidden",
              "&:hover": { color: "#0056b3" },
            }}
          >
            See details
          </Button>
        </a>
      </CardActions>
    </Card>
  );
}

export default Cards;
