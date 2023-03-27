export interface IProducerProps {
  id: string;
  cpfCnpj: string;
  producerName: string;
  farmName: string;
  countryState: string;
  city: string;
  farmArea: number;
  agroArea: number;
  forestArea: number;
  crops: Array<string>;
}
