import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const SkillsDelay = ({ communicativeSkills, socialInteractiveSkills }) => {
  const diff = Math.abs(communicativeSkills - socialInteractiveSkills);

  let perfilMensaje = '';
  let perfilTipo = '';
  if (diff <= 10) {
    perfilTipo = 'Perfil mixto:';
    perfilMensaje = 'Se recomienda una evaluación clínica detallada para identificar áreas específicas de intervención.';
  } else if (communicativeSkills > socialInteractiveSkills) {
    perfilTipo = 'Perfil comunicativo:';
    perfilMensaje = 'Se sugiere apoyo específico en el desarrollo de habilidades comunicativas.';
  } else {
    perfilTipo = 'Perfil interactivo-social:';
    perfilMensaje = 'Se sugiere apoyo específico en la mejora de habilidades sociales y de interacción.';
  }

  return (
    <motion.div 
      className="bg-white rounded-2xl p-8 shadow-xl flex flex-col justify-between h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div>
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Perfil de Habilidades
          </h2>
          <span
            title="Este perfil se genera automáticamente en función del desempeño observado en dos áreas clave."
            className="cursor-pointer text-gray-500"
          >
            <Info className="w-5 h-5" />
          </span>
        </div>

        {/* Subtexto */}
        <p className="text-sm text-gray-500 mb-6" style={{ textAlign: 'justify' }}>
          Visualización del nivel observado de dificultades en habilidades comunicativas y sociales.
        </p>

        {/* Barras de habilidades */}
        <div className="space-y-8">
          {/* Comunicativas */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Comunicativas</span>
              <span className="text-sm font-medium text-gray-700">{communicativeSkills}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-5">
              <motion.div 
                className="bg-sky-500 h-5 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${communicativeSkills}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Sociales e interactivas */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Interactivas Sociales</span>
              <span className="text-sm font-medium text-gray-700">{socialInteractiveSkills}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-5">
              <motion.div 
                className="bg-green-500 h-5 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${socialInteractiveSkills}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bloque azul al fondo */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md flex items-start gap-2">
        <Info className="text-blue-600 mt-0.5 w-5 h-5" />
        <div className="text-sm text-blue-800" style={{ textAlign: 'justify' }}>
          <strong>{perfilTipo}</strong> {perfilMensaje}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsDelay;
