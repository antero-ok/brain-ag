import { useAppSelector } from '../global/store';
import { IProducerProps } from '../models/producer';

type NumericMap = {
  [key: string]: number;
};

const getLabelsOccurrences = (prodList: string[]) => {
  const allLabels = prodList.map((producer) => producer);

  const occurrences: NumericMap = {};

  for (const item of allLabels) {
    if (occurrences[item]) {
      occurrences[item] += 1;
    } else {
      occurrences[item] = 1;
    }
  }

  return [Object.keys(occurrences), Object.values(occurrences)];
};

const useCharts = () => {
  const { producersList } = useAppSelector((state) => state.producer);

  const [countryStates, countryStatesCount] = getLabelsOccurrences(
    producersList.map((producer) => producer.countryState)
  );

  const { agroAreaSum, forestAreaSum } = producersList.reduce(
    (acc, { agroArea, forestArea }) => ({
      agroAreaSum: acc.agroAreaSum + Number(agroArea),
      forestAreaSum: acc.forestAreaSum + Number(forestArea),
    }),
    { agroAreaSum: 0, forestAreaSum: 0 }
  );

  const [crops, cropsCount] = getLabelsOccurrences(
    producersList.reduce((acc: string[], producer) => {
      return acc.concat(producer.crops);
    }, [])
  );

  return {
    countryStates,
    countryStatesCount,
    crops,
    cropsCount,
    soil: { agroAreaSum, forestAreaSum },
  };
};

export default useCharts;
