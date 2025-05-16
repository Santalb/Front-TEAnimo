import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import Header from './shared/Header';
import Footer from './shared/Footer';

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
      
      /*
      console.log("📄 cargado en nueva pestaña");
      console.log("🔍 Resultado Riesgo TEA:", storedData.resultadoRiesgo);
      console.log("responses:", storedData.responses);
      console.log("questions:", storedData.questions);
      console.log("qchatRespuestas:", storedData.qchatRespuestas);
      console.log("acumComunicativas:", storedData.acumComunicativas);
      console.log("acumSociales:", storedData.acumSociales);
      */
    }
  }, []);

  useEffect(() => {
    if (questions.length && responses.length) {
      generatePdfWithText();
    }
  }, [questions, responses]);

const generatePdfWithText = async () => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const colWidth = (pageWidth - margin * 2 - 10) / 2; // Espacio entre columnas
  const lineHeight = 6;

  // === PÁGINA 1: GRÁFICOS Y RESUMEN ===
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('RESUMEN DE RESULTADOS', pageWidth / 2, margin, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(33, 33, 33);

  // Puntaje Q-CHAT 10
  doc.text('Puntaje Q-CHAT 10', margin, 20);
  qchatRespuestas.forEach((val, i) => {
    const x = margin + i * 12;
    doc.setFillColor(val === 1 ? '#1976d2' : '#cfd8dc');
    doc.circle(x, 30, 3, 'F');
    doc.text(`P${i + 1}`, x - 3, 35);
  });

  // Gráfico circular de riesgo (65%)
  doc.setFillColor('#e0e0e0');
  doc.circle(40, 60, 15, 'F');
  doc.setFillColor('#1976d2');
  doc.circle(40, 60, 15, 'FD');
  doc.setTextColor('#000000');
  doc.setFontSize(10);
  doc.text('Porcentaje riesgo TEA', margin, 50);
  doc.text(`${resultadoRiesgo.toFixed(2)}%`, 36, 63);

  // Gráfico de evolución comunicativas
  doc.setDrawColor('#1976d2');
  doc.setLineWidth(1);
  doc.text('Evolución Habilidades Comunicativas', margin, 90);
  acumComunicativas.forEach((val, idx) => {
    const x1 = margin + idx * 10;
    const y1 = 100 - val * 0.6;
    const x2 = margin + (idx + 1) * 10;
    const y2 = acumComunicativas[idx + 1] ? 100 - acumComunicativas[idx + 1] * 0.6 : y1;
    doc.line(x1, y1, x2, y2);
  });

  // Gráfico de evolución sociales
  doc.setDrawColor('#2e7d32');
  doc.text('Evolución Habilidades Sociales', margin, 120);
  acumSociales.forEach((val, idx) => {
    const x1 = margin + idx * 10;
    const y1 = 130 - val * 0.6;
    const x2 = margin + (idx + 1) * 10;
    const y2 = acumSociales[idx + 1] ? 130 - acumSociales[idx + 1] * 0.6 : y1;
    doc.line(x1, y1, x2, y2);
  });

  // === PÁGINA 2: PREGUNTAS Y RESPUESTAS ===
  doc.addPage();
  let yLeft = margin + 15;
  let yRight = margin + 15;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORME DE RESPUESTAS', pageWidth / 2, margin, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(33, 33, 33);

  questions.forEach((q, i) => {
    const qText = `${i + 1}. ${q.text}`;
    const aText = `Respuesta: ${q.options?.[responses[i]] ?? responses[i]}`;
    const qLines = doc.splitTextToSize(qText, colWidth);
    const aLines = doc.splitTextToSize(aText, colWidth);
    const totalHeight = (qLines.length + aLines.length) * lineHeight + 2;

    const isLeft = i % 2 === 0;
    const x = isLeft ? margin : margin + colWidth + 10;
    let y = isLeft ? yLeft : yRight;

    if (y + totalHeight > pageHeight - margin) {
      doc.addPage();
      yLeft = margin + 10;
      yRight = margin + 10;
      y = isLeft ? yLeft : yRight;
    }

    qLines.forEach(line => {
      doc.text(line, x, y);
      y += lineHeight;
    });
    aLines.forEach(line => {
      doc.text(line, x, y);
      y += lineHeight;
    });

    if (isLeft) yLeft = y + lineHeight;
    else yRight = y + lineHeight;
  });

  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  setPdfUrl(url);
  return { doc, blob };
};


  const handleSendEmail = async () => {
    if (!email || !email.includes('@')) {
      alert('Por favor, ingresa un correo válido.');
      return;
    }
    const { blob } = await generatePdfWithText();
    const formData = new FormData();
    formData.append('file', blob, 'informe.pdf');
    formData.append('destinatario', email);
    try {
      const res = await fetch('http://localhost:8000/simular-upload-blob/', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      alert(res.ok ? result.mensaje : 'Error en el envío: ' + result.error);
    } catch (error) {
      console.error('Fallo en el envío:', error);
      alert('Fallo al enviar el informe.');
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">

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
