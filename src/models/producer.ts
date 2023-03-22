export interface IProducerProps {
  id: string;
  cpfCnpj: string;
  producerName: string;
  farmName: string;
  countryState: string;
  city: string;
  farmArea: number | null;
  agroArea: number | null;
  forestArea: number | null;
  crops: Array<string>;
}
