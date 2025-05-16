import React, { useContext } from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { GlobalContext } from '../contexts/GlobalContext';
import Header from './shared/Header';
import Footer from './shared/Footer';

const Dashboard = () => {
  const {
    qchatRespuestas,
    porcentajeComunicativas,
    porcentajeSociales,
    acumComunicativas,
    resultadoRiesgo,
    acumSociales
  } = useContext(GlobalContext);

  const score = qchatRespuestas.reduce((acc, val) => acc + val, 0);
  const puntosX = Array.from({ length: 18 }, (_, i) => `P${i + 1}`);

  const scaleArrayTo18 = (array) => {
    const result = [];
    for (let i = 0; i < 18; i++) {
      const index = Math.floor(i * array.length / 18);
      result.push(array[index]);
    }
    return result;
  };

  const comScaled = scaleArrayTo18(acumComunicativas).map(v => v / 100);
  const socScaled = scaleArrayTo18(acumSociales).map(v => v / 100);

  const pathCom = comScaled.map((v, i) => `${5 + i * (95 / 17)} ${100 - v * 100 - 7}`).join(' L ');
  const pathSoc = socScaled.map((v, i) => `${5 + i * (95 / 17)} ${100 - v * 100 - 7 }`).join(' L ');

  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <div className="max-w-7xl mx-auto space-y-8" id="dashboard-report">

        {/* HEADER */}
        <Header
          title="Resultado de la Evaluación"
          subtitle="Sistema de Evaluación de Autismo Infantil"
          showButton
          buttonText="Ver Informe"
          onButtonClick={() => window.open('/report', '_blank')}
        />


        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-amber-500" size={24} />
          <p className="text-amber-800">
            Este informe es una herramienta de evaluación preliminar. Consulte con un profesional para un diagnóstico preciso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Puntaje Q-CHAT 10</h2>
              <span className="bg-blue-600 text-white px-4 py-1 rounded-xl font-bold">{score}/10</span>
            </div>
            <div className="h-64 relative">
              <svg className="absolute inset-0 w-full h-full">
                {qchatRespuestas.map((val, i) => (
                  <circle
                    key={i}
                    cx={`${3 +i * 10}%`}
                    cy={`${100 - (qchatRespuestas.slice(0, i + 1).reduce((a, v) => a + v, 0)) * 10}%`}
                    r="4"
                    fill="#3B82F6"
                    opacity={val === 1 ? 1 : 0.2}
                  />
                ))}
              </svg>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              {qchatRespuestas.map((_, i) => <span key={i}>A{i + 1}</span>)}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Porcentaje riesgo TEA</h2>
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-700 mb-4">{resultadoRiesgo}%</div>
              <p className="text-gray-700 font-medium mb-2">Riesgo Significativo</p>
              <p className="text-sm text-gray-600">Se recomienda evaluación profesional detallada</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Retraso en Habilidades</h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Comunicativas</span>
                <span>{porcentajeComunicativas}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: `${porcentajeComunicativas}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Interactivas Sociales</span>
                <span>{porcentajeSociales}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${porcentajeSociales}%` }} />
              </div>
            </div>
            <div className="text-center text-sm text-blue-600 bg-blue-50 border border-blue-100 mt-4 p-4 rounded-xl">
              Perfil Mixto: se sugiere una evaluación clínica personalizada.
            </div>
          </div>
        </div>

        {/* GRAFICO */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Evolución Temporal de Habilidades</h2>
          <div className="h-96 relative">
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Líneas horizontales del eje Y + etiquetas */}
              {[0, 25, 50, 75, 100].map(y => (
                <g key={y}>
                  <line x1="0" y1={100 - y - 7} x2="100" y2={100 - y - 7} stroke="#ddd" strokeWidth="0.5" />
                  <text
                    x="1"
                    y={100 - y - 7}
                    fontSize="3"
                    fill="#666"
                    textAnchor="start"
                    alignmentBaseline="middle"
                  >
                    {y}
                  </text>
                </g>
              ))}

              {/* Líneas suaves */}
              <path
                d={`M ${pathCom}`}
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M ${pathSoc}`}
                fill="none"
                stroke="#22c55e"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Etiquetas del eje X */}
            <div className="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-gray-700 px-2">
              {puntosX.map((p, i) => (
                <span key={i} className="text-[10px]">{p}</span>
              ))}
            </div>
          </div>
        </div>


      <Footer />
      
      </div>
    </div>
  );
};

export default Dashboard;