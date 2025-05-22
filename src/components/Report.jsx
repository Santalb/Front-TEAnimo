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
  const [resultadoRiesgo, setResultadoRiesgo] = useState([]);
  const [email, setEmail] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [enviandoCorreo, setEnviandoCorreo] = useState(false);
  const [mensajeCorreo, setMensajeCorreo] = useState('');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("reportData"));
    if (storedData) {
      setResponses(storedData.responses);
      setQuestions(storedData.questions);
      setQchatRespuestas(storedData.qchatRespuestas || []);
      setAcumComunicativas(storedData.acumComunicativas || []);
      setAcumSociales(storedData.acumSociales || []);
      setResultadoRiesgo(storedData.resultadoRiesgo || []);
    }
  }, []);

  useEffect(() => {
    if (questions.length && responses.length) {
      handleGeneratePdf();
    }
  }, [questions, responses]);

  const handleGeneratePdf = async () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl); // Limpiar url anterior
    }

    const { blob, url } = await generatePdfWithText({
      questions,
      responses,
      qchatRespuestas,
      acumComunicativas,
      acumSociales,
      resultadoRiesgo
    });

    setPdfUrl(url);
  };

  const handleSendEmail = async () => {
    if (!email || !email.includes('@')) {
      alert('Por favor, ingresa un correo válido.');
      return;
    }

    setEnviandoCorreo(true);
    setMensajeCorreo("Enviando correo...");

    const { blob } = await generatePdfWithText({
      questions,
      responses,
      qchatRespuestas,
      acumComunicativas,
      acumSociales,
      resultadoRiesgo
    });

    const { ok, result } = await sendPdfToEmail(email, blob);

    if (ok) {
      setMensajeCorreo(`Correo enviado correctamente a ${email}`);
      setTimeout(() => {
        setEnviandoCorreo(false);
        setMensajeCorreo('');
        setEmail('');
      }, 1500);
    } else {
      setMensajeCorreo("Error al enviar el correo: " + result.error);
      setTimeout(() => {
        setEnviandoCorreo(false);
        setMensajeCorreo('');
      }, 3000);
    }
  };

  // Cleanup: liberar URL al desmontar
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">

      {/* Modal de envío de correo */}
      {enviandoCorreo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-2">Estado del envío</h3>
            <p className="text-gray-700">{mensajeCorreo}</p>
          </div>
        </div>
      )}

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
        disabled={enviandoCorreo}
      />

      {pdfUrl && (
        <div className="mt-6 border rounded-xl overflow-hidden shadow">
          <iframe
            key={pdfUrl}
            src={pdfUrl}
            title="Vista previa del informe"
            className="w-full h-[800px]"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Report;
