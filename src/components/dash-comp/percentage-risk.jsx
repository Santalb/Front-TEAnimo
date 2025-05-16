import React from 'react';

const PercentageRisk = ({ percentage }) => {
  let riskLevel = "Bajo";
  let color = "#22C55E"; // Verde

  if (percentage > 30 && percentage <= 60) {
    riskLevel = "Moderado";
    color = "#F59E0B";
  } else if (percentage > 60 && percentage <= 80) {
    riskLevel = "Significativo";
    color = "#EF4444";
  } else if (percentage > 80) {
    riskLevel = "Alto";
    color = "#7F1D1D";
  }

  const size = 180;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Porcentaje riesgo TEA
      </h2>

      <div className="flex justify-center mb-4">
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
            fontSize="24"
            fontWeight="bold"
            fill="#111827"
          >
            {percentage.toFixed(2)}%
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
        <p className="text-sm text-gray-600">
          Se recomienda evaluación profesional detallada
        </p>
      </div>
    </div>
  );
};

export default PercentageRisk;
