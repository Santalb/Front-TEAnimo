import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SocialSkillsChart = ({ data }) => {
  const questionNumbers = [5, 10, 11, 13, 14];
  const labels = questionNumbers.map((n) => `P${n}`);


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: function (tooltipItems) {
            const label = tooltipItems[0].label;
            return `Pregunta ${label.replace('P', '')}:`;
          },
          label: function (context) {
            const porcentaje = context.parsed.y;
            return `${porcentaje}%`;
          },
        },
      }
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Habilidades Interactivas Sociales',
        data,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.1,
      },
    ],
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Evolución de Habilidades Interactivas Sociales
      </h2>

      <div className="h-[300px]">
        <Line options={chartOptions} data={chartData} />
      </div>
    </motion.div>
  );
};

export default SocialSkillsChart;
