import React from 'react';
import { Info } from 'lucide-react';

const PercentageRisk = ({ resultado }) => {
  // Validar el arreglo [clase, porcentaje]
  const clase = Array.isArray(resultado) && resultado.length === 2 ? resultado[0] : 0;
  const porcentaje = Array.isArray(resultado) && resultado.length === 2 ? resultado[1] : 0;
  const parsedPercentage = typeof porcentaje === 'number' && !isNaN(porcentaje) ? porcentaje : 0;

  // Lógica para nivel de confiabilidad
  let riskLevel = "Baja";
  let color = "#7F1D1D"; // Rojo oscuro por defecto

  if (parsedPercentage > 30 && parsedPercentage <= 60) {
    riskLevel = "Moderada";
    color = "#F59E0B"; // Amarillo
  } else if (parsedPercentage > 60 && parsedPercentage <= 80) {
    riskLevel = "Significativo";
    color = "#EF4444"; // Rojo
  } else if (parsedPercentage > 80) {
    riskLevel = "Alta";
    color = "#22C55E"; // Verde
  }

  // Invertir colores si hay riesgo (clase 1)
  if (clase === 1) {
    if (color === "#22C55E") {
      color = "#EF4444"; // Verde pasa a Rojo
    } else if (color === "#EF4444") {
      color = "#22C55E"; // Rojo pasa a Verde
    }
  }

  // Cálculos del gráfico circular
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (parsedPercentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl min-h-[380px] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Evaluación de riesgo TEA
        </h2>
        <span
          title="Este porcentaje es una estimación basada en el modelo y no sustituye una evaluación clínica profesional."
          className="cursor-pointer text-gray-500"
        >
          <Info className="w-5 h-5" />
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {clase === 1 ? "Su hijo presenta riesgo de TEA" : "Su hijo no presenta riesgo de TEA"}
      </p>

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
          Confiabilidad {riskLevel}
        </div>
        <p className="text-sm text-gray-600 px-2" style={{ textAlign: 'justify' }}>
          Se recomienda evaluación profesional detallada para confirmar el resultado y determinar el tipo de apoyo necesario.
        </p>
      </div>
    </div>
  );
};

export default PercentageRisk;
