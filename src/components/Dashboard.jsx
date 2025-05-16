import React, { useContext } from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { GlobalContext } from '../contexts/GlobalContext';
import Qchat10Score from './dash-comp/Qchat10Score';
import PercentageRisk from './dash-comp/percentage-risk';
import SkillsDelay from './dash-comp/skills-delay';
import CommunicativeSkillsChart from './dash-comp/CommunicativeSkillsChart';
import SocialSkillsChart from './dash-comp/SocialSkillsChart';
import Header from './shared/Header';
import Footer from './shared/Footer';

const Dashboard = () => {
  const {
    porcentajeComunicativas,
    porcentajeSociales,
    acumComunicativas,
    resultadoRiesgo,
    acumSociales
  } = useContext(GlobalContext);

  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <div className="max-w-7xl mx-auto space-y-8" id="dashboard-report">

        {/* Header */}
        <Header
          title="Resultado de la Evaluación"
          subtitle="Sistema de Evaluación de Autismo Infantil"
          showButton
          buttonText="Ver Informe"
          onButtonClick={() => window.open('/report', '_blank')}
        />

        {/* Mensaje Informativo */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-amber-500" size={24} />
          <p className="text-amber-800">
            Este informe es una herramienta de evaluación preliminar. Consulte con un profesional para un diagnóstico preciso.
          </p>
        </div>

        {/* Graficos Base */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <Qchat10Score />

          <PercentageRisk percentage={resultadoRiesgo} />

          <SkillsDelay
           communicativeSkills={porcentajeComunicativas}
            socialInteractiveSkills={porcentajeSociales}
          />

        </div>

        {/* Graficos Evolucion */}
        <CommunicativeSkillsChart data={acumComunicativas} />
        <SocialSkillsChart data={acumSociales} />

        {/* Footer */}
        <Footer />
      
      </div>
    </div>
  );
};

export default Dashboard;