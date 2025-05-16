import React, { useEffect, useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import ChartRenderHidden from './report-comp/ChartRenderHidden';
import { generatePdfWithText } from './report-comp/PdfGenerator';
import { sendPdfToEmail } from './report-comp/EmailSender';

const Report = () => {
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [qchatRespuestas, setQchatRespuestas] = useState([]);
  const [acumComunicativas, setAcumComunicativas] = useState([]);
  const [acumSociales, setAcumSociales] = useState([]);
  const [resultadoRiesgo, setResultadoRiesgo] = useState(0);
  const [email, setEmail] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("reportData"));
    if (storedData) {
      setResponses(storedData.responses);
      setQuestions(storedData.questions);
      setQchatRespuestas(storedData.qchatRespuestas || []);
      setAcumComunicativas(storedData.acumComunicativas || []);
      setAcumSociales(storedData.acumSociales || []);
      setResultadoRiesgo(storedData.resultadoRiesgo || 0);
    }
  }, []);

  useEffect(() => {
    if (questions.length && responses.length) {
      handleGeneratePdf();
    }
  }, [questions, responses]);

  const handleGeneratePdf = async () => {
    const { blob } = await generatePdfWithText({
      questions,
      responses,
      qchatRespuestas,
      acumComunicativas,
      acumSociales,
      resultadoRiesgo
    });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  const handleSendEmail = async () => {
    if (!email || !email.includes('@')) {
      alert('Por favor, ingresa un correo válido.');
      return;
    }
    const { blob } = await generatePdfWithText({
      questions,
      responses,
      qchatRespuestas,
      acumComunicativas,
      acumSociales,
      resultadoRiesgo
    });
    const { ok, result } = await sendPdfToEmail(email, blob);
    alert(ok ? result.mensaje : 'Error en el envío: ' + result.error);
  };

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      <ChartRenderHidden
        acumComunicativas={acumComunicativas}
        acumSociales={acumSociales}
      />

      <Header
        title="Informe de Respuestas"
        subtitle="Sistema de Evaluación de Autismo Infantil"
        showInput
        inputValue={email}
        onInputChange={(e) => setEmail(e.target.value)}
        showButton
        buttonText="Enviar al correo"
        onButtonClick={handleSendEmail}
      />

      {pdfUrl && (
        <div className="mt-6 border rounded-xl overflow-hidden shadow">
          <iframe src={pdfUrl} title="Vista previa del informe" className="w-full h-[800px]" />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Report;
