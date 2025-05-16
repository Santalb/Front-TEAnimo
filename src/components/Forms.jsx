import React, { useState, useContext } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { GlobalContext } from '../contexts/GlobalContext';
import Header from './shared/Header';
import Footer from './shared/Footer';


const questions = [
  { id: 1, text: "¿Cuántos años tiene su hijo/a?", type: "input", options: [] },
  { id: 2, text: "¿Cuál es el género de su hijo/a?", type: "select", options: ["Masculino", "Femenino"] },
  { id: 3, text: "¿Tu hijo te mira cuando lo llamas por su nombre?", type: "default", options: ['Siempre', 'Usualmente', 'A veces', 'Raramente', 'Nunca'] },
  { id: 4, text: "¿Qué tan fácil es para ti lograr contacto visual con tu hijo?", type: "default", options: ['Muy fácil', 'Bastante fácil', 'Bastante difícil', 'Muy difícil', 'Imposible'] },
  { id: 5, text: "¿Tu hijo señala para indicar que quiere algo?", type: "default", options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca'] },
  { id: 6, text: "¿Tu hijo señala para compartir interés contigo?", type: "default", options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca'] },
  { id: 7, text: "¿Tu hijo finge?", type: "default", options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca'] },
  { id: 8, text: "¿Tu hijo sigue con la mirada hacia donde tú estás mirando?", type: "default", options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca'] },
  { id: 9, text: "¿Tu hijo muestra señales de querer consolar?", type: "default", options: ['Siempre', 'Usualmente', 'A veces', 'Raramente', 'Nunca'] },
  { id: 10, text: "¿Cómo describirías las primeras palabras de tu hijo?", type: "default", options: ['Muy típicas', 'Bastante típicas', 'Ligeramente inusuales', 'Muy inusuales', 'Mi hijo no habla'] },
  { id: 11, text: "¿Tu hijo usa gestos simples?", type: "default", options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca'] },
  { id: 12, text: "¿Tu hijo se queda mirando fijamente a la nada sin un propósito aparente?", type: "default", options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca'] },
  { id: 13, text: "¿Su hijo/a tiene dificultades para hablar o expresar ideas claramente?", type: "yesno", options: ["Sí", "No"] },
  { id: 14, text: "¿Su hijo/a tiene dificultades para aprender?", type: "yesno", options: ["Sí", "No"] },
  { id: 15, text: "¿Su hijo/a tiene algún trastorno genético?", type: "yesno", options: ["Sí", "No"] },
  { id: 16, text: "¿Su hijo/a presenta síntomas de depresión?", type: "yesno", options: ["Sí", "No"] },
  { id: 17, text: "¿Ha notado un retraso en el desarrollo de su hijo/a?", type: "yesno", options: ["Sí", "No"] },
  { id: 18, text: "¿Su hijo/a tiene problemas de comportamiento o sociales?", type: "yesno", options: ["Sí", "No"] },
  { id: 19, text: "¿Su hijo/a muestra señales de ansiedad?", type: "yesno", options: ["Sí", "No"] },
  { id: 20, text: "¿Alguien en su familia cercana ha sido diagnosticado con autismo?", type: "yesno", options: ["Sí", "No"] }
];

const Forms = ({ onFinish }) => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const {
    setScoreData,
    setQchatRespuestas,
    setResumenTotal,
    setEvolComunicativas,
    setEvolSociales,
    setPorcentajeComunicativas,
    setPorcentajeSociales,
    setAcumComunicativas,
    setAcumSociales,
    setHoraInicio,
    setHoraFin,
    horaInicio
  } = useContext(GlobalContext);


  const calculateScore = (resps) =>
    resps.slice(2, 12).reduce((acc, val, idx) => {
      if (val === null) return acc;
      if (idx < 9) return acc + (val >= 2 ? 1 : 0);
      if (idx === 9) return acc + (val <= 2 ? 1 : 0);
      return acc;
    }, 0);

  const calculateHabilidadPorcentajes = (resps) => {
    let sociales = 0;
    let comunicativas = 0;

    if (resps[4] >= 2) sociales += 20;
    if (resps[9] >= 2) sociales += 20;
    if (resps[10] >= 2) sociales += 20;
    if (resps[12] === 1) sociales += 25;
    if (resps[13] === 1) sociales += 15;

    if (resps[2] >= 2) comunicativas += 10;
    if (resps[3] >= 2) comunicativas += 10;
    if (resps[5] >= 2) comunicativas += 10;
    if (resps[6] >= 2) comunicativas += 15;
    if (resps[7] >= 2) comunicativas += 15;
    if (resps[8] >= 2) comunicativas += 15;
    if (resps[17] === 1) comunicativas += 20;
    if (resps[18] === 1) comunicativas += 5;

    return {
      habilidadesSociales: sociales,
      habilidadesComunicativas: comunicativas
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calcular tiempo final y duración
    const fin = new Date();
    setHoraFin(fin);


    const qchatScore = calculateScore(responses);
    const { habilidadesSociales, habilidadesComunicativas } = calculateHabilidadPorcentajes(responses);

    const qchatRespuestas = responses.slice(2, 12).map((val, idx) => {
      if (val === null) return 0;
      if (idx < 9) return val >= 2 ? 1 : 0;
      if (idx === 9) return val <= 2 ? 1 : 0;
      return 0;
    });

    let acumComunicativas = [];
    let acumSociales = [];
    let comTotal = 0;
    let socTotal = 0;

    // Comunicación
    if (responses[2] >= 2) comTotal += 10;
    acumComunicativas.push(comTotal);
    if (responses[3] >= 2) comTotal += 10;
    acumComunicativas.push(comTotal);
    if (responses[5] >= 2) comTotal += 10;
    acumComunicativas.push(comTotal);
    if (responses[6] >= 2) comTotal += 15;
    acumComunicativas.push(comTotal);
    if (responses[7] >= 2) comTotal += 15;
    acumComunicativas.push(comTotal);
    if (responses[8] >= 2) comTotal += 15;
    acumComunicativas.push(comTotal);
    if (responses[17] === 1) comTotal += 20;
    acumComunicativas.push(comTotal);
    if (responses[18] === 1) comTotal += 5;
    acumComunicativas.push(comTotal);

    // Sociales
    if (responses[4] >= 2) socTotal += 20;
    acumSociales.push(socTotal);
    if (responses[9] >= 2) socTotal += 20;
    acumSociales.push(socTotal);
    if (responses[10] >= 2) socTotal += 20;
    acumSociales.push(socTotal);
    if (responses[12] === 1) socTotal += 25;
    acumSociales.push(socTotal);
    if (responses[13] === 1) socTotal += 15;
    acumSociales.push(socTotal);

    const edad = responses[0];
    const genero = responses[1] === 0 ? 1 : 0; // Masculino = 1, Femenino = 0
    const preguntasExtras = responses.slice(12);

    const evolComunicativas = [responses[2], responses[3], responses[5], responses[6], responses[7], responses[8], responses[17], responses[18]]
      .map((r, idx) => idx <= 5 ? (r >= 2 ? 1 : 0) : (r === 0 ? 1 : 0));

    const evolSociales = [responses[4], responses[9], responses[10], responses[12], responses[13]]
      .map((r, idx) => idx <= 2 ? (r >= 2 ? 1 : 0) : (r === 0 ? 1 : 0));

    const resumenTotal = [
      edad,
      genero,
      ...qchatRespuestas,
      qchatScore,
      ...preguntasExtras,
      socTotal,
      comTotal,
      horaInicio?.toLocaleString("es-PE", { timeZone: "America/Lima" }) || '',
      fin.toLocaleString("es-PE", { timeZone: "America/Lima" })
    ];

    const Tiempos_Ini_Fin = [
      horaInicio?.toLocaleString("es-PE", { timeZone: "America/Lima" }) || '',
      fin.toLocaleString("es-PE", { timeZone: "America/Lima" })
    ];

    // Almacenar en el contexto
    setScoreData(qchatRespuestas);
    setQchatRespuestas(qchatRespuestas);
    setResumenTotal(resumenTotal);
    setEvolComunicativas(evolComunicativas);
    setEvolSociales(evolSociales);
    setPorcentajeComunicativas(habilidadesComunicativas);
    setPorcentajeSociales(habilidadesSociales);
    setAcumComunicativas(acumComunicativas);
    setAcumSociales(acumSociales);
    
    console.log("Duracion de la Evaluacion:", Tiempos_Ini_Fin);
    /* Debug en consola
    console.log("🧠 Q-CHAT respuestas binarias:", qchatRespuestas);
    console.log("📋 Resumen Total:", resumenTotal);
    console.log("💬 Evolución Comunicativas:", evolComunicativas);
    console.log("🤝 Evolución Sociales:", evolSociales);
    console.log("✅ Puntaje Q-CHAT:", qchatScore);
    console.log("% Comunicativas:", habilidadesComunicativas);
    console.log("% Sociales:", habilidadesSociales);
    console.log("📈 Acumulado Comunicativas:", acumComunicativas);
    console.log("📉 Acumulado Sociales:", acumSociales);
    */

    // Guardar en localStorage
    localStorage.setItem('reportData', JSON.stringify({
      responses,
      questions,
      qchatRespuestas,
      acumComunicativas,
      acumSociales,
      porcentajeSociales: habilidadesSociales,
      porcentajeComunicativas: habilidadesComunicativas,
      horaInicio: horaInicio?.toLocaleString("es-PE", { timeZone: "America/Lima" }) || '',
      horaFin: fin.toLocaleString("es-PE", { timeZone: "America/Lima" })
    }))

  // Enviar al backend
  fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ values: resumenTotal })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ Respuesta del backend:", data);
      // Ejemplo: puedes guardar data.riesgo_autismo en contexto
      // setResultadoRiesgo(data.riesgo_autismo);
    })
    .catch((err) => {
      console.error("❌ Error al enviar los datos:", err);
    });

  onFinish();
  };

  const handleChange = (qIndex, oIndex) => {
    const newResponses = [...responses];
    const question = questions[qIndex];

    if (question.type === "yesno") {
      // "Sí" = 1, "No" = 0
      newResponses[qIndex] = oIndex === 0 ? 1 : 0;
    } else {
      newResponses[qIndex] = oIndex;
    }

    setResponses(newResponses);
  };


  const handleNext = () => {
    if (currentQuestion === 0) {
      const inicio = new Date();
      setHoraInicio(inicio);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const getVisibleQuestions = () => {
    const prevIndex = Math.max(0, currentQuestion - 4);
    const nextEndIndex = Math.min(questions.length, currentQuestion + 4);
    return questions.slice(prevIndex, nextEndIndex);
  };

  const isSelected = (qIndex, oIndex) => {
    const question = questions[qIndex];
    if (question.type === "yesno") {
      return responses[qIndex] === (oIndex === 0 ? 1 : 0);
    }
    return responses[qIndex] === oIndex;
  };


  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="max-w-7xl w-full mx-auto space-y-8 flex-grow">

        <Header
          title="Formulario de Evaluación"
          subtitle="Sistema de Evaluación de Autismo Infantil"
        />


        <div className="flex items-start">
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
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

                  {questions[currentQuestion].type === 'input' ? (
                    <input
                      type="number"
                      min={1}
                      max={18}
                      value={responses[currentQuestion] || ''}
                      onChange={(e) => handleChange(currentQuestion, parseInt(e.target.value) || '')}
                      className="border border-gray-300 rounded px-3 py-2 w-1/2"
                      placeholder="Ingrese la edad en años"
                    />
                  ) : (
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, oIndex) => (
                        <label
                          key={oIndex}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-400 ${
                            isSelected(currentQuestion, oIndex)
                              ? 'bg-blue-100 border-blue-500'
                              : 'border-gray-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion}`}
                            checked={
                              questions[currentQuestion].type === "yesno"
                                ? responses[currentQuestion] === (oIndex === 0 ? 1 : 0)
                                : responses[currentQuestion] === oIndex
                            }
                            onChange={() => handleChange(currentQuestion, oIndex)}
                            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex items-center px-4 py-2 text-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" /> Anterior
                  </button>

                  {currentQuestion === questions.length - 1 ? (
                    <button
                      type="submit"
                      disabled={responses.includes(null)}
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                    >
                      Finalizar
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={responses[currentQuestion] === null}
                      className="flex items-center px-4 py-2 text-blue-600 font-medium disabled:opacity-50 hover:bg-blue-50 rounded-lg"
                    >
                      Siguiente <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

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

        <Footer />

      </div>
    </div>
  );
};

export default Forms;
