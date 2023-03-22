import { Container, TextField } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const ProducersLayout: FC = () => {
  return (
    <Container sx={{ width: 1, height: 1 }}>
      <TextField />
    </Container>
  );
};

export default ProducersLayout;
