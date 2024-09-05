import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';

function Card({ driver }) {
  return (
    <Paper
      sx={{
        width: '300px',
        height: '450px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        margin: '20px',
        backgroundColor: 'white',
        padding: '3px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Link
        to={`/detail/${driver.id}`}
        style={{
          display: 'flex',
          textDecoration: 'none',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src={driver.image}
          alt={driver.forename}
          style={{
            width: '100%',
            height: '300px',
            display: 'block',
            objectFit: 'cover',
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontSize: '28px',
            marginBottom: '8px',
            marginTop: '25px',
            transition: 'color 0.3s ease',
          }}
        >
          {driver.forename} {driver.surname}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            fontSize: '15px',
            lineHeight: 1.3,
            marginBottom: '8px',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#333',
            },
          }}
        >
          {driver.nationality}
        </Typography>
      </Link>
    </Paper>
  );
}

export default Card;