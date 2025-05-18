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
import { questions } from '../form-comp/questions'; // Asegúrate de que la ruta sea correcta

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CommunicativeSkillsChart = ({ data }) => {
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
            const index = tooltipItems[0].dataIndex;
            const questionId = questionNumbers[index];
            const question = questions.find(q => q.id === questionId);
            return question ? question.text : `Pregunta ${questionId}`;
          },
          label: function (context) {
            return `${context.parsed.y}%`;
          },
        },
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
      <h2 className="text-xl font-semibold text-gray-800">
        Seguimiento de nivel de dificultad comunicativa
      </h2>
      <p className="text-sm text-gray-500 mb-6" style={{ textAlign: 'justify' }}>
        Valores más altos indican un mayor nivel de dificultad observada en las conductas comunicativas.
      </p>

      <div className="h-[300px]">
        <Line options={chartOptions} data={chartData} />
      </div>
    </motion.div>
  );
};

export default CommunicativeSkillsChart;
