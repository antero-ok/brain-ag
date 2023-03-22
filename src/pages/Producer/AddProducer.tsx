import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { Form } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IProducerProps } from '../../models/producer';

import { cities, states } from 'estados-cidades';
import Header from '../../components/common/Header';
import PageContainer from '../../components/common/PageContainer';

const AddProducer = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IProducerProps>({
    defaultValues: {
      agroArea: null,
      city: '',
      countryState: '',
      cpfCnpj: '',
      crops: [],
      farmArea: null,
      farmName: '',
      forestArea: null,
      producerName: '',
    },
  });
  const submitForm: SubmitHandler<IProducerProps> = (data) => {
    console.log(data);
  };

  return (
    <PageContainer>
      <Header title="Novo Produtor" />
      <Form onSubmit={handleSubmit(submitForm)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '32px',
            mt: 2,
          }}
        >
          <FormControl
            sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}
          >
            <TextField
              {...register('producerName')}
              label="Nome do produtor"
              size="small"
              sx={{ flex: 1 }}
            />

            <TextField
              {...register('cpfCnpj')}
              label="CPF / CNPJ"
              size="small"
              sx={{ flex: 1 }}
            />
          </FormControl>

          <FormControl
            sx={{ display: 'flex', flexDirection: 'column', rowGap: '24px' }}
          >
            <TextField
              {...register('farmName')}
              label="Nome da Fazenda"
              size="small"
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
              <FormControl sx={{ width: 120 }} size="small">
                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                <Controller
                  name="countryState"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      label="Estado"
                    >
                      {states()?.map((countryState) => {
                        return (
                          <MenuItem key={countryState} value={countryState}>
                            {countryState}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <Autocomplete
                  {...register('city')}
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={cities(watch('countryState')) || []}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register('city')}
                      label="Cidade"
                    />
                  )}
                />
              </FormControl>
            </Box>
          </FormControl>

          <FormControl
            sx={{ display: 'flex', flexDirection: 'column', rowGap: '24px' }}
          >
            <TextField
              {...register('farmArea')}
              label="Área da fazenda"
              size="small"
              type="number"
            />

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
              <TextField
                {...register('agroArea')}
                label="Área agriculturável"
                size="small"
                type="number"
                fullWidth
              />
              <TextField
                {...register('forestArea')}
                label="Área de vegetação"
                size="small"
                type="number"
                fullWidth
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}
            size="small"
          >
            <InputLabel id="culturas">Culturas cultivadas</InputLabel>
            <Select
              id="culturas"
              multiple
              input={<OutlinedInput label="Culturas cultivadas" />}
              renderValue={(selected: string[]) => selected.join(', ')}
              {...register('crops')}
              value={watch('crops')}
            >
              {['arroz', 'feijao', 'soja'].map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button color="success" variant="contained" type="submit">
            Salvar
          </Button>
        </Box>
      </Form>
    </PageContainer>
  );
};

export default AddProducer;
