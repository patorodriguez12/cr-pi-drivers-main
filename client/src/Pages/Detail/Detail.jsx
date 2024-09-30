import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDriverById } from "../../redux/actions";
import { Box, Button, Typography, Paper } from "@mui/material";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const driver = useSelector((state) => state.driver);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getDriverById(id));
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading driver: {error}</div>;
  if (!driver || driver.length === 0) return <div>No driver found</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#1C1C1C",
        padding: "20px",
      }}
    >
      <Paper
        sx={{
          padding: "30px",
          backgroundColor: "#2B2A4C",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.6)",
          maxWidth: "600px",
          textAlign: "center",
          color: "#EEE2DE",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "#E10600", fontWeight: "bold", marginBottom: "20px" }}
        >
          {driver[0].forename} {driver[0].surname}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Nationality: {driver[0].nationality}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Date of Birth: {driver[0].dob}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "20px",
            maxHeight: "250px",
            overflowY: "auto",
            padding: "10px",
            backgroundColor: "#1A1A1A",
            borderRadius: "5px",
          }}
        >
          {driver[0].description}
        </Typography>
        <Typography
          variant="h6"
          sx={{ marginBottom: "10px", fontWeight: "bold" }}
        >
          Teams: {driver[0].teams}
        </Typography>

        <Button
          variant="contained"
          onClick={handleGoBack}
          sx={{
            marginTop: "20px",
            backgroundColor: "#E10600",
            "&:hover": { backgroundColor: "#FF1E1E" },
          }}
        >
          Go Back
        </Button>
      </Paper>
    </Box>
  );
}

export default Detail;
