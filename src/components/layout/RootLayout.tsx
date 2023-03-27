import React from 'react';
import { Container, Paper, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import AppContainer from './AppContainer';

const RootLayout = () => {
  return (
    <AppContainer>
      <SideBar />

      <Box sx={{ width: 1 }}>
        <Outlet />
      </Box>
    </AppContainer>
  );
};

export default RootLayout;
