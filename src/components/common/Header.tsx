import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography fontSize={24}>{title}</Typography>
      <Button
        onClick={() => navigate(-1)}
        variant="outlined"
        startIcon={<KeyboardBackspaceIcon />}
      >
        Voltar
      </Button>
    </Box>
  );
};

export default Header;
