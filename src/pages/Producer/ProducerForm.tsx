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
import { Form, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IProducerProps } from '../../models/producer';

import { cities, states } from 'estados-cidades';
import Header from '../../components/common/Header';
import PageContainer from '../../components/common/PageContainer';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../global/store';
import useProducer from '../../hooks/useProducer';

const AddProducer = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { producersList } = useAppSelector((state) => state.producer);
  const [disableFields, setDisableFields] = useState(false);
  const { producerFormAction } = useProducer();
  const navigate = useNavigate();
  const all = useLocation();

  const getDefaultFormValue = () => {
    if (id) {
      const producerToBeEdited = producersList.find(
        (producer) => producer.id === id
      );
      if (producerToBeEdited) {
        for (const key in producerToBeEdited) {
          //@ts-expect-error
          setValue(key, producerToBeEdited[key]);
        }
      } else {
        navigate('/produtores');
      }
    }
  };

  useEffect(() => {
    if (pathname.includes('/produtores/detalhes')) {
      setDisableFields(true);
    }
  }, []);

  useEffect(() => {
    getDefaultFormValue();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
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
            disabled={disableFields}
          >
            <TextField
              {...register('producerName')}
              label="Nome do produtor"
              size="small"
              sx={{ flex: 1 }}
              disabled={disableFields}
            />

            <TextField
              {...register('cpfCnpj')}
              label="CPF / CNPJ"
              size="small"
              sx={{ flex: 1 }}
              disabled={disableFields}
            />
          </FormControl>

          <FormControl
            sx={{ display: 'flex', flexDirection: 'column', rowGap: '24px' }}
          >
            <TextField
              {...register('farmName')}
              label="Nome da Fazenda"
              size="small"
              disabled={disableFields}
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
                      disabled={disableFields}
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
                  size="small"
                  id="combo-box-demo"
                  options={cities(watch('countryState')) || []}
                  disabled={disableFields}
                  // a ser implementado
                  // defaultValue={defaultValues?.city}
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
              disabled={disableFields}
            />

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
              <TextField
                {...register('agroArea')}
                label="Área agriculturável"
                size="small"
                type="number"
                fullWidth
                disabled={disableFields}
              />
              <TextField
                {...register('forestArea')}
                label="Área de vegetação"
                size="small"
                type="number"
                fullWidth
                disabled={disableFields}
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
              disabled={disableFields}
            >
              {['arroz', 'feijao', 'soja'].map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={() => producerFormAction(getValues())}
            color="success"
            variant="contained"
            type="submit"
            disabled={disableFields}
          >
            Salvar
          </Button>
        </Box>
      </Form>
    </PageContainer>
  );
};

export default AddProducer;
