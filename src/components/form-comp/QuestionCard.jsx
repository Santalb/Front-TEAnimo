import React from 'react';

const QuestionCard = ({ question, response, onChange }) => {
  return (
    <div className="mb-8">
      {/* Pregunta principal */}
      <h3 className="text-xl text-gray-700">
        {question.text}
      </h3>

      {/* Ejemplo o espaciado */}
      {question.example ? (
        <p className="text-sm italic text-gray-500 mb-4 lg:mb-6">{question.example}</p>
      ) : (
        <div className="mb-5"></div>
      )}

      {/* Entrada numérica para edad */}
      {question.type === 'input' ? (
        <input
          type="number"
          min={1}
          max={18}
          value={response || ''}
          onChange={(e) => onChange(parseInt(e.target.value) || '')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
          className="border border-gray-300 rounded px-3 py-2 w-1/2"
          placeholder="Ingrese la edad en años"
        />
      ) : (
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = response === idx;

            return (
              <label
                key={idx}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isSelected ? 'bg-blue-100 border-blue-500' : 'border-gray-200 hover:bg-blue-50 hover:border-blue-400'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={isSelected}
                  onChange={() => onChange(idx)}
                  className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
