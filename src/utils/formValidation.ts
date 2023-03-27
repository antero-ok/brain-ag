import * as yup from 'yup';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export const producerFormSchema = yup.object({
  city: yup.string().required('Campo obrigatório'),
  countryState: yup.string().required('Campo obrigatório'),
  cpfCnpj: yup
    .string()
    .test('validate-docs', 'Digite um CPF/CNPJ válido', (value) => {
      return cpf.isValid(String(value)) || cnpj.isValid(String(value));
    })
    .required('Campo obrigatório'),
  crops: yup.array().of(yup.string()).min(1, 'Deve ter no mínimo um item'),
  farmName: yup.string().required('Campo obrigatório'),
  producerName: yup.string().required('Campo obrigatório'),
  agroArea: yup
    .number()
    .typeError('Digite um valor numérico')
    .moreThan(0, 'O valor deve ser maior do que zero')
    .test(
      'validate-agroArea',
      'Áreas maiores do que o tamanho da fazenda',
      function (value) {
        const agroArea = value || 0;
        const forestArea = this.parent.agroArea || 0;
        const farmArea = this.parent.farmArea || 0;
        return agroArea + forestArea <= farmArea;
      }
    )
    .required('Campo obrigatório'),
  forestArea: yup
    .number()
    .typeError('Digite um valor numérico')
    .moreThan(0, 'O valor deve ser maior do que zero')
    .test(
      'validate-forestArea',
      'Áreas maiores do que o tamanho da fazenda',
      function (value) {
        const agroArea = this.parent.agroArea || 0;
        const forestArea = value || 0;
        const farmArea = this.parent.farmArea || 0;
        return agroArea + forestArea <= farmArea;
      }
    )
    .required('Campo obrigatório'),
  farmArea: yup
    .number()
    .typeError('Digite um valor numérico')
    .moreThan(0, 'O valor deve ser maior do que zero')
    .test(
      'validate-farmArea',
      'Área menor do que Vegetação + Agrícola',
      function (value) {
        const agroArea = this.parent.agroArea || 0;
        const forestArea = this.parent.forestArea || 0;
        const farmArea = value || 0;
        return agroArea + forestArea <= farmArea;
      }
    )
    .required('Campo obrigatório'),
});
