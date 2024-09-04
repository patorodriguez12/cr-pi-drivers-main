// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import Filters from '../Filters/Filters';
import { Drawer, Box } from '@mui/material';

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <Filters />
      </Box>
    </Drawer>
  );
}

export default Sidebar;
