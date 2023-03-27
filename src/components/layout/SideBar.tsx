import React, { CSSProperties } from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BarChartIcon from '@mui/icons-material/BarChart';

const sidebarStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const linkStyles: CSSProperties = { textDecoration: 'none' };

const SideBar = () => {
  return (
    <Box
      sx={{
        width: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '64px',
        background: '#efefef',
        p: 6,
      }}
    >
      <NavLink style={{ ...linkStyles }} to="/">
        <Box sx={sidebarStyles}>
          <HomeIcon fontSize="large" />
          <Typography fontSize={14}>Home</Typography>
        </Box>
      </NavLink>

      <NavLink style={{ ...linkStyles }} to="produtores">
        <Box sx={sidebarStyles}>
          <AgricultureIcon fontSize="large" />
        </Box>
        <Typography fontSize={14}>Produtores</Typography>
      </NavLink>

      <NavLink style={{ ...linkStyles }} to="estatisticas">
        <Box sx={sidebarStyles}>
          <BarChartIcon fontSize="large" />
        </Box>
        <Typography fontSize={14}>Informações</Typography>
      </NavLink>
    </Box>
  );
};

export default SideBar;
