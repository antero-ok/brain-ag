import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { Form, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IProducerProps } from '../../models/producer';

import { cities, states } from 'estados-cidades';
import Header from '../../components/common/Header';
import PageContainer from '../../components/common/PageContainer';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../global/store';
import useProducer from '../../hooks/useProducer';
import { producerFormSchema } from '../../utils/formValidation';
import { CROPS } from '../../providers/cropProvider';

const AddProducer = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { producersList } = useAppSelector((state) => state.producer);
  const [disableFields, setDisableFields] = useState(false);
  const { producerFormAction } = useProducer();
  const navigate = useNavigate();

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
    resolver: yupResolver(producerFormSchema),
    defaultValues: {
      agroArea: 0,
      city: '',
      countryState: '',
      cpfCnpj: '',
      crops: [],
      farmArea: 0,
      farmName: '',
      forestArea: 0,
      producerName: '',
    },
  });

  const submitForm: SubmitHandler<IProducerProps> = (data) => {
    console.log(data);
  };

  return (
    <PageContainer>
      <Header title="Produtor Rural" />
      <Form
        onSubmit={handleSubmit(submitForm, (e) => {
          console.log(e);
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '16px',
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
              error={!!errors.producerName}
              helperText={errors.producerName?.message || ' '}
            />

            <TextField
              {...register('cpfCnpj')}
              label="CPF / CNPJ"
              size="small"
              sx={{ flex: 1 }}
              disabled={disableFields}
              error={!!errors.cpfCnpj}
              helperText={errors.cpfCnpj?.message || ' '}
            />
          </FormControl>

          <FormControl
            sx={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}
          >
            <TextField
              {...register('farmName')}
              label="Nome da Fazenda"
              size="small"
              disabled={disableFields}
              error={!!errors.farmName}
              helperText={errors.farmName?.message || ' '}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
              <FormControl sx={{ width: 180 }} size="small">
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
                      error={!!errors.countryState}
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
                <FormHelperText error={!!errors.countryState}>
                  {errors.countryState?.message || ' '}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <Autocomplete
                  size="small"
                  id="combo-box-demo"
                  options={cities(watch('countryState')) || []}
                  disabled={disableFields}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register('city')}
                      label="Cidade"
                      error={!!errors.city}
                    />
                  )}
                />
                <FormHelperText error={!!errors.city}>
                  {errors.city?.message || ' '}
                </FormHelperText>
              </FormControl>
            </Box>
          </FormControl>

          <FormControl
            sx={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}
          >
            <TextField
              {...register('farmArea')}
              label="Área da fazenda"
              size="small"
              type="number"
              disabled={disableFields}
              error={!!errors.farmArea}
              helperText={errors.farmArea?.message || ' '}
            />

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
              <TextField
                {...register('agroArea')}
                label="Área agriculturável"
                size="small"
                type="number"
                fullWidth
                disabled={disableFields}
                error={!!errors.agroArea}
                helperText={errors.agroArea?.message || ' '}
              />
              <TextField
                {...register('forestArea')}
                label="Área de vegetação"
                size="small"
                type="number"
                fullWidth
                disabled={disableFields}
                error={!!errors.forestArea}
                helperText={errors.forestArea?.message || ' '}
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{ display: 'flex', flexDirection: 'column' }}
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
              error={!!errors.crops}
            >
              {CROPS.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={!!errors.crops}>
              {errors.crops?.message || ' '}
            </FormHelperText>
          </FormControl>
          <Button
            onClick={() => {
              producerFormAction(getValues());
              navigate('/produtores');
            }}
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
