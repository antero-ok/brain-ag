import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import { FC } from 'react';
import { PRODUCERS } from '../../providers/producerProvider';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { NavLink } from 'react-router-dom';
import Header from '../../components/common/Header';
import PageContainer from '../../components/common/PageContainer';

const ProducersLayout: FC = () => {
  return (
    <PageContainer>
      <Header title="Producers" />

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <NavLink style={{ textDecoration: 'none' }} to="novo" end>
          <Button variant="contained">Novo</Button>
        </NavLink>
        <TextField fullWidth size="small" />
      </Box>

      <Box sx={{ overflowY: 'auto' }}>
        <List>
          {PRODUCERS.map((producer) => {
            return (
              <ListItem
                sx={{ ':hover': { bgcolor: '#dcdcdc' } }}
                key={producer.cpfCnpj}
                secondaryAction={
                  <>
                    <IconButton>
                      <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton>
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </>
                }
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: 1,
                  }}
                >
                  <ListItemText
                    sx={{ flex: 2, overflow: 'hidden' }}
                    primary={producer.producerName}
                  />
                  <ListItemText
                    sx={{ flex: 2, overflow: 'hidden' }}
                    primary={producer.city}
                  />
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </PageContainer>
  );
};

export default ProducersLayout;
