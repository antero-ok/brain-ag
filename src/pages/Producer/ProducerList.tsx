import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { PRODUCERS } from '../../providers/producerProvider';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { NavLink } from 'react-router-dom';
import Header from '../../components/common/Header';
import PageContainer from '../../components/common/PageContainer';
import { useAppDispatch, useAppSelector } from '../../global/store';

import { findProducerByName, removeProducer } from '../../global/producerSlice';

const ProducersLayout: FC = () => {
  const { producersList } = useAppSelector((state) => state.producer);
  const dispatch = useAppDispatch();

  return (
    <PageContainer>
      <Header title="Produtores" />

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <NavLink style={{ textDecoration: 'none' }} to="novo" end>
          <Button variant="contained">Novo</Button>
        </NavLink>
        <TextField
          fullWidth
          size="small"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const fieldValue = e.currentTarget.value;
            dispatch(findProducerByName(fieldValue));
          }}
        />
      </Box>

      <Box
        sx={{
          width: 1,
          display: 'flex',
          justifyContent: 'space-between',
          pl: 2,
          pt: 2,
        }}
      >
        <Typography align="left" flex={4} fontWeight="bold">
          FAZENDA
        </Typography>
        <Typography align="left" flex={3} fontWeight="bold">
          LOCAL
        </Typography>
        <Typography align="left" flex={2} fontWeight="bold">
          AÇÕES
        </Typography>
      </Box>
      <Box sx={{ overflowY: 'auto' }}>
        <List>
          {producersList.map((producer) => {
            return (
              <ListItem
                sx={{ ':hover': { bgcolor: '#dcdcdc' } }}
                key={producer.id}
                secondaryAction={
                  <>
                    <NavLink to={`detalhes/${producer.id}`}>
                      <IconButton>
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </NavLink>

                    <NavLink to={`editar/${producer.id}`}>
                      <IconButton>
                        <EditOutlinedIcon />
                      </IconButton>
                    </NavLink>

                    <IconButton
                      onClick={() => dispatch(removeProducer(producer))}
                    >
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
                    sx={{ flex: 1, overflow: 'hidden' }}
                    primary={producer.farmName}
                  />
                  <ListItemText
                    sx={{ flex: 1, overflow: 'hidden' }}
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
