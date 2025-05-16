import React, { useState, useContext } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { GlobalContext } from '../contexts/GlobalContext';
import Header from './shared/Header';
import Footer from './shared/Footer';
import QuestionCard from './form-comp/QuestionCard';
import NavigationButtons from './form-comp/NavigationButtons';
import SidebarQuestionList from './form-comp/SidebarQuestionList';
import { questions } from './form-comp/questions';

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
    setResultadoRiesgo,
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
      comTotal,
      socTotal,
      horaInicio?.toLocaleString("es-PE", { timeZone: "America/Lima" }) || '',
      fin.toLocaleString("es-PE", { timeZone: "America/Lima" })
    ];

    const Tiempos_Ini_Fin = [
      horaInicio?.toLocaleString("es-PE", { timeZone: "America/Lima" }) || '',
      fin.toLocaleString("es-PE", { timeZone: "America/Lima" })
    ];

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

    localStorage.setItem('reportData', JSON.stringify({
      responses,
      questions,
      qchatRespuestas,
      acumComunicativas,
      acumSociales,
      porcentajeComunicativas: habilidadesComunicativas,
      porcentajeSociales: habilidadesSociales,
      horaInicio: horaInicio?.toLocaleString("es-PE", { timeZone: "America/Lima" }) || '',
      horaFin: fin.toLocaleString("es-PE", { timeZone: "America/Lima" })
    }))

  fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ values: resumenTotal })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("📦 Respuesta completa del backend:", data);
      setResultadoRiesgo(data.riesgo_autismo);

      const currentReportData = JSON.parse(localStorage.getItem('reportData')) || {};
      currentReportData.resultadoRiesgo = data.riesgo_autismo;
      localStorage.setItem('reportData', JSON.stringify(currentReportData));
    })
    .catch((err) => {
      console.error("Error al enviar los datos:", err);
    });

  onFinish();
  };

  const handleChange = (qIndex, oIndex) => {
    const newResponses = [...responses];
    const question = questions[qIndex];

    if (question.type === "yesno") {
      newResponses[qIndex] = oIndex; 
    } else {
      if (qIndex === 0) {
        if (typeof oIndex === 'number' && oIndex >= 0 && oIndex <= 18) {
          newResponses[qIndex] = oIndex;
        } else {
          newResponses[qIndex] = '';
        }
      } else {
        newResponses[qIndex] = oIndex;
      }
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
      return responses[qIndex] === oIndex;
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
                <QuestionCard
                  question={questions[currentQuestion]}
                  response={responses[currentQuestion]}
                  onChange={(val) => handleChange(currentQuestion, val)}
                />

                <NavigationButtons
                  currentQuestion={currentQuestion}
                  totalQuestions={questions.length}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onSubmit={handleSubmit}
                  disabledNext={responses[currentQuestion] === null}
                  disabledSubmit={responses.includes(null)}
                />
              </form>
            </div>
          </div>

          <SidebarQuestionList
            questions={getVisibleQuestions()}
            currentQuestion={currentQuestion}
            responses={responses}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Forms;

