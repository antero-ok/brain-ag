import { Box, Container, Paper } from '@mui/material';

function App() {
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
        <Box sx={{ width: '80px', border: '1px dashed red' }}>menu</Box>
        <Box sx={{ width: 1, border: '1px dashed red' }}>content</Box>
      </Paper>
    </Container>
  );
}

export default App;
