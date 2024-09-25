import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1976d2', color: 'white', padding: 2, textAlign: 'center', marginTop: 'auto' }}>
      <Typography variant="body1">© 2024 Mi Aplicación. Todos los derechos reservados.</Typography>
    </Box>
  );
};

export default Footer;
