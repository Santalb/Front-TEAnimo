// src/components/dash-comp/skills-delay.jsx
import React from 'react';
import { motion } from 'framer-motion';

const SkillsDelay = ({ communicativeSkills, socialInteractiveSkills }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl p-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Retraso en Habilidades
      </h2>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Comunicativas</span>
            <span className="text-sm font-medium text-gray-700">{communicativeSkills}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-sky-500 h-2.5 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${communicativeSkills}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Interactivas Sociales</span>
            <span className="text-sm font-medium text-gray-700">{socialInteractiveSkills}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-green-500 h-2.5 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${socialInteractiveSkills}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md text-center">
        <p className="text-sm text-blue-800">
          Perfil Mixto: se sugiere una evaluación clínica personalizada.
        </p>
      </div>
    </motion.div>
  );
};

export default SkillsDelay;
