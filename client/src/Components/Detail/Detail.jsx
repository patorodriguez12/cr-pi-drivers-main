import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDriverById } from "../../redux/actions";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);

  useEffect(() => {
    dispatch(getDriverById(id));
  }, [dispatch, id]);

  const isUUID = (id) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  };

  const driver = drivers.find((driver) => {
    if (isUUID(id)) {
      return driver.id === id;
    } else {
      return driver.id === parseInt(id);
    }
  });

  if (!driver) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ padding: 4 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: "40%" },
            height: { xs: 300, sm: "100%" },
            objectFit: "cover",
          }}
          image={driver.image}
          alt={`${driver.forename} ${driver.surname}`}
        />

        <CardContent sx={{ flex: "1 0 auto", padding: 3 }}>
          <Typography component="h2" variant="h4" gutterBottom>
            {`${driver.forename} ${driver.surname}`}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            <strong>Date of Birth:</strong> {driver.dob}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            <strong>Nationality:</strong> {driver.nationality}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            <strong>Teams:</strong> {driver.teams}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>Description:</strong> {driver.description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Detail;
