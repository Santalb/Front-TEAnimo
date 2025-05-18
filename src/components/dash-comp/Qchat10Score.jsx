import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { GlobalContext } from '../../contexts/GlobalContext';

const Qchat10Score = () => {
  const { qchatRespuestas } = useContext(GlobalContext);
  const score = qchatRespuestas.reduce((acc, val) => acc + val, 0);
  const total = qchatRespuestas.length;

  const paddingX = 5;

  const puntos = qchatRespuestas.map((_, i) => {
    const acc = qchatRespuestas.slice(0, i + 1).reduce((a, v) => a + v, 0);
    const x = paddingX + (i / (total - 1)) * (100 - 2 * paddingX);
    const y = 100 - acc * 10;
    return { x, y };
  });

  const pathD = puntos.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Encabezado con Info + Score */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Puntaje Q-CHAT 10</h2>
          <span
            title="El Q-CHAT 10 evalúa señales tempranas relacionadas al autismo mediante 10 preguntas clave. Este puntaje refleja la cantidad de respuestas indicativas."
            className="cursor-pointer text-gray-500"
          >
            <Info className="w-5 h-5" />
          </span>
        </div>
        <span className="bg-blue-600 text-white px-4 py-1 rounded-xl font-bold text-sm">
          {score}/10
        </span>
      </div>

      {/* Subtítulo explicativo */}
      <p className="text-sm text-gray-500 mb-4" style={{ textAlign: 'justify' }}>
        Basado en 10 preguntas de observación temprana. Un puntaje más alto puede indicar mayor número de conductas asociadas al riesgo.
      </p>

      {/* Gráfico */}
      <div className="h-64 relative">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 110" preserveAspectRatio="none">
          {[25, 50, 75].map((y) => (
            <line
              key={y}
              x1="0"
              y1={100 - y}
              x2="100"
              y2={100 - y}
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          ))}

          <motion.path
            d={pathD}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {puntos.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="1.8"
              fill="#3B82F6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              opacity={qchatRespuestas[i] === 1 ? 1 : 0.25}
            />
          ))}

          {puntos.map((p, i) => (
            <text
              key={`label-${i}`}
              x={p.x}
              y={107}
              fontSize="4.5"
              fill="#6b7280"
              textAnchor="middle"
            >
              A{i + 1}
            </text>
          ))}
        </svg>
      </div>
    </motion.div>
  );
};

export default Qchat10Score;
