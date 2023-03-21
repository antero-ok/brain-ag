import React from 'react';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <Box
      sx={{
        width: '80px',
        border: '1px dashed red',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavLink to="/">Home</NavLink>
      <NavLink to="produtores">Produtores</NavLink>
      <NavLink to="estatisticas">Estatísticas</NavLink>
    </Box>
  );
};

export default SideBar;
