import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationButtons = ({ currentQuestion, totalQuestions, onPrevious, onNext, onSubmit, disabledNext, disabledSubmit }) => {
  return (
    <div className="flex justify-between items-center pt-2">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="flex items-center px-4 py-2 text-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 rounded-lg"
      >
        <ChevronLeft className="w-5 h-5 mr-2" /> Anterior
      </button>

      {currentQuestion === totalQuestions - 1 ? (
        <button
          type="submit"
          disabled={disabledSubmit}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        >
          Finalizar
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={disabledNext}
          className="flex items-center px-4 py-2 text-blue-600 font-medium disabled:opacity-50 hover:bg-blue-50 rounded-lg"
        >
          Siguiente <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
