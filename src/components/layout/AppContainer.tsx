import { FC, ReactNode } from 'react';
import { Container, Paper } from '@mui/material';

const AppContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          width: { xs: 1, md: 800 },
          height: { xs: 1, md: 600 },
          p: 2,
        }}
        elevation={3}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default AppContainer;
