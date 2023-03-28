import React from 'react';
import Chart from 'chart.js/auto';
import { Pie, Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['SPAM', 'HAM'],
  datasets: [
    {
      label: 'SPAM vs HAM',
      backgroundColor: ['#ff7979', '#badc58'],
      // borderColor: ['#d9d9d933', '#d9d9d933'],
      // borderWidth: 2,
      data: [21, 79],
    },
  ],
};

const DoughnutChart = () => {
  return <Doughnut data={data} />;
};

export default DoughnutChart;
