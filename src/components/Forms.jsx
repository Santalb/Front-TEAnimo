import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "¿Tu hijo te mira cuando lo llamas por su nombre?",
    options: ['Siempre', 'Usualmente', 'A veces', 'Raramente', 'Nunca']
  },
  {
    id: 2,
    text: "¿Qué tan fácil es para ti lograr contacto visual con tu hijo?",
    options: ['Muy fácil', 'Bastante fácil', 'Bastante difícil', 'Muy difícil', 'Imposible']
  },
  {
    id: 3,
    text: "¿Tu hijo señala para indicar que quiere algo?",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  },
  {
    id: 4,
    text: "¿Tu hijo señala para compartir interés contigo?",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  },
  {
    id: 5,
    text: "¿Tu hijo finge?",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  },
  {
    id: 6,
    text: "¿Tu hijo sigue con la mirada hacia donde tú estás mirando?",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  },
  {
    id: 7,
    text: "¿Tu hijo muestra señales de querer consolar?",
    options: ['Siempre', 'Usualmente', 'A veces', 'Raramente', 'Nunca']
  },
  {
    id: 8,
    text: "¿Cómo describirías las primeras palabras de tu hijo?",
    options: ['Muy típicas', 'Bastante típicas', 'Ligeramente inusuales', 'Muy inusuales', 'Mi hijo no habla']
  },
  {
    id: 9,
    text: "¿Tu hijo usa gestos simples?",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  },
  {
    id: 10,
    text: "¿Tu hijo se queda mirando fijamente a la nada sin un propósito aparente?",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  }
];

const Forms = ({ setScoreData }) => {
  const [responses, setResponses] = useState(Array(10).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Función reutilizable para calcular el score
  const calculateScore = (resps) => {
    return resps.reduce((acc, val, idx) => {
      if (val === null) return acc;
      if (idx < 9) return acc + (val >= 2 ? 1 : 0);   // Preguntas 1–9: C, D, E valen 1
      if (idx === 9) return acc + (val <= 2 ? 1 : 0); // Pregunta 10: A, B, C valen 1
      return acc;
    }, 0);
  };

  const handleChange = (qIndex, oIndex) => {
    const newResponses = [...responses];
    newResponses[qIndex] = oIndex;
    setResponses(newResponses);

    const scores = newResponses.map((val, idx) => {
      if (val === null) return 0;
      if (idx < 9) return val >= 2 ? 1 : 0;
      if (idx === 9) return val <= 2 ? 1 : 0;
      return 0;
    });
    setScoreData(scores);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateScore(responses);

    const message = score > 3
      ? "Este resultado sugiere que podría ser útil una evaluación multidisciplinaria."
      : "Este resultado no indica necesariamente la necesidad de evaluación, pero puede consultar a un especialista si tiene dudas.";

    alert(`¡Cuestionario completado!\n\nPuntaje total: ${score}/10\n${message}`);
  };

  const getVisibleQuestions = () => {
    const prevIndex = Math.max(0, currentQuestion - 4);
    const nextEndIndex = Math.min(questions.length, currentQuestion + 4);
    return questions.slice(prevIndex, nextEndIndex);
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEAD */}
        <header className="flex justify-between items-center bg-white rounded-2xl p-8 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Formulario de Evaluación
              </h1>
            </div>
            <p className="text-gray-600 text-lg">Sistema de Evaluación de Autismo Infantil</p>
          </div>
        </header>

        <div className="min-h-screen  flex items-start">

          {/* Formulario */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">

              {/* Encabezado Form */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-800">Cuéntanos sobre tu hijo</h2>
                <span className="text-blue-600 font-semibold">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-xl text-gray-700 mb-4">
                    {questions[currentQuestion].text}
                  </h3>

                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, oIndex) => (
                      <div key={option} className="relative">
                        <label
                          className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-400"
                          style={{
                            borderColor:
                              responses[currentQuestion] === oIndex ? '#1d4ed8' : '#e5e7eb',
                            backgroundColor:
                              responses[currentQuestion] === oIndex ? '#eff6ff' : 'white'
                          }}
                        >
                          <input
                            type="radio"
                            name={`question-${questions[currentQuestion].id}`}
                            value={oIndex}
                            checked={responses[currentQuestion] === oIndex}
                            onChange={() => handleChange(currentQuestion, oIndex)}
                            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-lg text-gray-700">{option}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex items-center px-4 py-2 text-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Anterior
                  </button>

                  {currentQuestion === questions.length - 1 ? (
                    <button
                      type="submit"
                      disabled={responses.includes(null)}
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Finalizar
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={responses[currentQuestion] === null}
                      className="flex items-center px-4 py-2 text-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      Siguiente
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Vista Lateral Preguntas */}
          <div className="w-56 bg-white shadow-lg p-4 hidden lg:block rounded-xl">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Preguntas cercanas</h3>
            <div className="space-y-4">
              {getVisibleQuestions().map((question) => {
                const isCurrentQuestion = question.id === questions[currentQuestion].id;
                const isPreviousQuestion = question.id === questions[currentQuestion].id - 1;
                const relativePosition = question.id - questions[currentQuestion].id;

                return (
                  <div
                    key={question.id}
                    className={`p-2 rounded-lg text-sm transition-all ${
                      isCurrentQuestion
                        ? 'bg-blue-100 border border-blue-300'
                        : responses[question.id - 1] !== null
                        ? 'bg-blue-50'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                          isCurrentQuestion
                            ? 'bg-blue-500 text-white'
                            : isPreviousQuestion
                            ? 'bg-blue-200 text-blue-800'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {question.id}
                      </span>
                      <span
                        className={`text-xs ${
                          isCurrentQuestion
                            ? 'font-medium text-blue-800'
                            : relativePosition > 0
                            ? 'text-gray-500'
                            : 'text-gray-400'
                        }`}
                      >
                        {question.text.length > 30
                          ? question.text.substring(0, 30) + '...'
                          : question.text}
                      </span>
                    </div>
                    {responses[question.id - 1] !== null && (
                      <div className="mt-1 text-xs text-blue-600 pl-7">
                        ✓ {question.options[responses[question.id - 1]]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* footer */}
        <footer className="text-center text-gray-500 text-sm">
          <p>© 2025 TESIS I • LEON ALEXIS - CASTRO ERNESTO</p>
        </footer>

      </div>
    </div>
  );
};

export default Forms;
