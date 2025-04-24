import React from 'react';
import { Download, ExternalLink, AlertCircle } from 'lucide-react';

const Dashboard = ({ scoreData }) => {
  // Generación explícita de los datos para el gráfico
  const numberOfPoints = 20;
  const points = Array.from({ length: numberOfPoints }, (_, i) => `P${i + 1}`);
  const communicativeData = Array.from({ length: numberOfPoints }, () => 0);
  const socialData = Array.from({ length: numberOfPoints }, () => 0);

  // Generación del primer punto
  communicativeData[0] = Math.floor(Math.random() * 60) + 10; 
  socialData[0] = Math.floor(Math.random() * 60) + 10; 


  for (let i = 1; i < numberOfPoints; i++) {
    const changeComm = Math.floor(Math.random() * 20) - 7; 
    const changeSoc = Math.floor(Math.random() * 15) - 7; 

    communicativeData[i] = Math.max(5, Math.min(95, communicativeData[i - 1] + changeComm));
    socialData[i] = Math.max(5, Math.min(95, socialData[i - 1] + changeSoc));
  }

  // Cálculo del total
  const total = scoreData.reduce((acc, val) => acc + val, 0);

  // Cálculo acumulativo
  const cumulativeData = scoreData.reduce((acc, val, i) => {
    acc.push((acc[i - 1] || 0) + val);
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">

      {/* HEAD */}
      <header className="flex justify-between items-center bg-white rounded-2xl p-8 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Resultado de la Evaluación
              </h1>
            </div>
            <p className="text-gray-600 text-lg">Sistema de Evaluación de Autismo Infantil</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
              <Download size={20} />
              Descargar informe
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md">
              <ExternalLink size={20} />
              Conoce más aquí
            </button>
          </div>
      </header>

        {/* Alert Section */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-amber-500" size={24} />
          <p className="text-amber-800">
            Este informe es una herramienta de evaluación preliminar. Para un diagnóstico definitivo, consulte con un profesional de la salud.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* CARD */}
          <div className="bg-white rounded-2xl p-8 shadow-xl ">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Puntaje Q-CHAT 10</h2>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl font-bold text-lg shadow-md">
                {total}/10
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative h-64">
                {[...Array(11)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-px bg-gray-100"
                    style={{ bottom: `${i * 10}%` }}
                  >
                    <span className="absolute -left-6 text-xs text-gray-400">{i}</span>
                  </div>
                ))}
                <div className="absolute bottom-0 left-0 right-0 h-full">
                  <svg className="w-full h-full">
                    <path
                      d={`M ${cumulativeData.map((value, i) => 
                        `${(i * (100 / (cumulativeData.length - 1)))}% ${100 - (value * 10)}%`
                      ).join(' L ')}`}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                    {cumulativeData.map((value, i) => (
                      <circle
                        key={i}
                        cx={`${(i * (100 / (cumulativeData.length - 1)))}%`}
                        cy={`${105 - (value * 10)}%`}
                        r="4"
                        fill="#3B82F6"
                        className="hover:r-6 transition-all duration-200"
                      />
                    ))}
                  </svg>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                {[...Array(scoreData.length)].map((_, i) => (
                  <span key={i}>A{i + 1}</span>
                ))}
              </div>
            </div>
          </div>

          {/* TEA Risk Card */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Porcentaje riesgo TEA</h2>
            <div className="flex flex-col items-center justify-center h-48">
              <div className="flex flex-col items-center">
                <div className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent text-center mb-6">
                  65%
                </div>
                <div className="text-sm text-gray-600 text-center mt-4 bg-blue-50 p-6 rounded-xl border border-blue-100 w-full">
                  <p className="font-medium mb-2">Riesgo Significativo</p>
                  <p>Se recomienda una evaluación profesional detallada para un diagnóstico preciso</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Progress Card */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Retraso en Habilidades</h2>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Comunicativas</span>
                  <span className="text-sm font-bold text-blue-600">75%</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Interactivas Sociales</span>
                  <span className="text-sm font-bold text-blue-600">50%</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: '50%' }}
                  />
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 text-center mt-4 bg-blue-50 p-6 rounded-xl border border-blue-100 w-full">
                  <p className="font-medium mb-2">Perfil Mixto</p>
                  <p>Recomendamos una evaluación profesional para obtener un diagnóstico completo</p>
                </div>

          </div>

        </div>

        {/* Graph Section */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Evolución Temporal de Habilidades
          </h2>
          <div className="h-96 relative">
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-px bg-gray-100"
                  style={{ bottom: `${(i * 20)}%` }}
                />
              ))}
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-sm text-gray-500">
              {[100, 80, 60, 40, 20, 0].map((value) => (
                <span key={value} className="text-right pr-4">{value}%</span>
              ))}
            </div>

            <div className="absolute left-16 right-0 bottom-8 top-0">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {points.map((_, i) => (
                <line
                  key={i}
                  x1={`${(i * (100 / (numberOfPoints - 1)))}`}
                  y1="0"
                  x2={`${(i * (100 / (numberOfPoints - 1)))}`}
                  y2="100"
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              ))}
                <path
                  d={`M ${communicativeData.map((value, index) =>
                    `${(index * (100 / (numberOfPoints - 1)))} ${100 - value}`).join(' L ')}`}
                  fill="none"
                  stroke="blue"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={`M ${socialData.map((value, index) =>
                    `${(index * (100 / (numberOfPoints - 1)))} ${100 - value}`).join(' L ')}`}
                  fill="none"
                  stroke="green"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
                <defs>
                  <linearGradient id="blue-gradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                  <linearGradient id="green-gradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="absolute left-16 right-0 bottom-0 flex justify-between text-sm text-gray-500">
              {points.map((point, i) => (
                <span key={point} className="text-center" style={{ width: `${100 / (numberOfPoints - 1)}%` }}>
                  {point}
                </span>
              ))}
            </div>

            <div className="absolute top-4 right-0 flex gap-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <span className="text-sm font-medium text-gray-700">Habilidades Comunicativas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
                <span className="text-sm font-medium text-gray-700">Habilidades Interactivas Sociales</span>
              </div>
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

export default Dashboard;
