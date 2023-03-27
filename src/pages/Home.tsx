import { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useAppSelector } from '../global/store';
import { formatLongNumber } from '../utils/functions';

const Home: FC = () => {
  const { producersList } = useAppSelector((state) => state.producer);
  const totalFarms = producersList.length;
  const totalFarmsArea = producersList.reduce(
    (acc, curr) => acc + (curr.farmArea ?? 0),
    0
  );

  return (
    <Container
      sx={{
        width: 1,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '72px',
      }}
    >
      <Box>
        <Typography align="center" fontWeight="bold" fontSize={48}>
          {formatLongNumber(totalFarms)}
        </Typography>
        <Typography align="center" fontSize={28}>
          Fazendas cadastradas
        </Typography>
      </Box>

      <Box>
        <Typography align="center" fontWeight="bold" fontSize={48}>
          {formatLongNumber(totalFarmsArea)}
        </Typography>
        <Typography align="center" fontSize={28}>
          Hectares de Fazendas
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
