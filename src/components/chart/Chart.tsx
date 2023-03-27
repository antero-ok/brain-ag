import { FC } from 'react';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  CoreChartOptions,
  PluginChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CHART_COLORS } from '../../providers/chartProvider';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart: FC<{ labels: string[]; occurrences: number[] }> = ({
  labels,
  occurrences,
}) => {
  const data: ChartData<'pie', number[], string> = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: occurrences,
        backgroundColor: CHART_COLORS,
      },
    ],
  };

  const options: _DeepPartialObject<
    CoreChartOptions<'pie'> | PluginChartOptions<'pie'>
  > = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false,
        text: 'Chart.js Pie Chart',
      },
    },
  };
  return <Pie data={data} options={options} />;
};

export default Chart;
