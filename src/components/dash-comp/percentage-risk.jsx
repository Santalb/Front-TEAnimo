import React from 'react';
import { Info } from 'lucide-react';

const PercentageRisk = ({ percentage }) => {
  const parsedPercentage = typeof percentage === 'number' && !isNaN(percentage) ? percentage : 0;

  let riskLevel = "Bajo";
  let color = "#22C55E"; // Verde

  if (parsedPercentage > 30 && parsedPercentage <= 60) {
    riskLevel = "Moderado";
    color = "#F59E0B";
  } else if (parsedPercentage > 60 && parsedPercentage <= 80) {
    riskLevel = "Significativo";
    color = "#EF4444";
  } else if (parsedPercentage > 80) {
    riskLevel = "Alto";
    color = "#7F1D1D";
  }

  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (parsedPercentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl min-h-[360px] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Porcentaje riesgo TEA
        </h2>
        <span
          title="Este porcentaje es una estimación basada en el modelo y no sustituye una evaluación clínica profesional."
          className="cursor-pointer text-gray-500"
        >
          <Info className="w-5 h-5" />
        </span>
      </div>

      <div className="flex justify-center mb-2">
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy="0.3em"
            fontSize="22"
            fontWeight="bold"
            fill="#111827"
          >
            {parsedPercentage.toFixed(2)}%
          </text>
        </svg>
      </div>

      <div className="text-center">
        <div
          className="inline-block px-3 py-1 rounded-full text-white font-medium mb-2"
          style={{ backgroundColor: color }}
        >
          Riesgo {riskLevel}
        </div>
        <p className="text-sm text-gray-600 px-2" style={{ textAlign: 'justify' }}>
          Se recomienda evaluación profesional detallada para confirmar el resultado y determinar el tipo de apoyo necesario.
        </p>
      </div>
    </div>
  );
};

export default PercentageRisk;
