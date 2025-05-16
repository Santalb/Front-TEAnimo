import React from 'react';

const SidebarQuestionList = ({ questions, currentQuestion, responses }) => {
  return (
    <div className="w-56 bg-white shadow-lg p-4 hidden lg:block rounded-xl">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Preguntas cercanas</h3>
      <div className="space-y-4">
        {questions.map((question) => {
          const isCurrent = question.id - 1 === currentQuestion;
          const isPrevious = question.id - 1 === currentQuestion - 1;
          const relative = question.id - 1 - currentQuestion;
          const answered = responses[question.id - 1] !== null;

          return (
            <div
              key={question.id}
              className={`p-2 rounded-lg text-sm transition-all ${
                isCurrent
                  ? 'bg-blue-100 border border-blue-300'
                  : answered
                  ? 'bg-blue-50'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                    isCurrent
                      ? 'bg-blue-500 text-white'
                      : isPrevious
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {question.id}
                </span>
                <span
                  className={`text-xs ${
                    isCurrent
                      ? 'font-medium text-blue-800'
                      : relative > 0
                      ? 'text-gray-500'
                      : 'text-gray-400'
                  }`}
                >
                  {question.text.length > 30 ? question.text.slice(0, 30) + '...' : question.text}
                </span>
              </div>
              {answered && (
                <div className="mt-1 text-xs text-blue-600 pl-7">
                  {question.options[responses[question.id - 1]]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarQuestionList;
