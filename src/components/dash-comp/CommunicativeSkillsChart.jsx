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

const CommunicativeSkillsChart = ({ data }) => {
  const labels = Array.from({ length: data.length }, (_, i) => `P${i + 1}`);

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
        position: 'top',
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Habilidades Comunicativas',
        data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
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
        Evolución de Habilidades Comunicativas
      </h2>

      <div className="h-[300px]">
        <Line options={chartOptions} data={chartData} />
      </div>
    </motion.div>
  );
};

export default CommunicativeSkillsChart;
