import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ barData = [0, 0] }) => {
  const data = {
    labels: ['SPAM', 'HAM'],
    datasets: [
      {
        label: 'Spam vs Ham',
        backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)'],
        borderWidth: 1,
        data: barData,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Class of Comments',
        },
      },
      y: {
        title: {
          display: true,
          text: '% of Comments',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
