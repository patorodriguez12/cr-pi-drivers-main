import React from "react";
import { Box, Typography, Modal } from "@mui/material";

function Detail({ driver, open, handleClose }) {
  if (!driver) return null; // Retorna null si no hay ningún driver seleccionado

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {driver.forename} {driver.surname}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Nationality:</strong> {driver.nationality}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Teams:</strong> {driver.teams}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Date of Birth:</strong>{" "}
          {new Date(driver.dob).toLocaleDateString()}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Description:</strong> {driver.description}
        </Typography>
      </Box>
    </Modal>
  );
}

export default Detail;
