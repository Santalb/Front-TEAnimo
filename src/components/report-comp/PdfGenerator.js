import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const waitFor = (ms) => new Promise((res) => setTimeout(res, ms));

const loadImage = (src) => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => resolve();
  img.src = src;
});

export const generatePdfWithText = async ({
  questions,
  responses,
  qchatRespuestas,
  acumComunicativas,
  acumSociales,
  resultadoRiesgo
}) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const lineHeight = 6;
  const colWidth = (pageWidth - margin * 2 - 10) / 2;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('RESUMEN DE RESULTADOS', pageWidth / 2, margin, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const puntajeTotal = qchatRespuestas.reduce((a, b) => a + b, 0);
  const col1Lines = [`Puntaje Q-CHAT 10: ${puntajeTotal}`, ...qchatRespuestas.map((v, i) => `A${i + 1}: ${v}`)];
  const col2Lines = [
    `Porcentaje de Riesgo: ${resultadoRiesgo.toFixed(2)}%`,
    '',
    'Porcentaje de Retraso de Habilidades:',
    `- Comunicativas: ${acumComunicativas.at(-1) ?? 0}%`,
    `- Interactivas Sociales: ${acumSociales.at(-1) ?? 0}%`,
  ];

  let y = margin + 10;
  let yMax = y;

  col1Lines.forEach((line) => {
    doc.text(line, margin, y);
    y += lineHeight;
  });
  yMax = y;

  let y2 = margin + 10;
  col2Lines.forEach((line) => {
    doc.text(line, margin + colWidth + 10, y2);
    y2 += lineHeight;
  });
  yMax = Math.max(yMax, y2);

  // Gráficos
  const el1 = document.getElementById('com-chart');
  const el2 = document.getElementById('soc-chart');

  if (el1 && el2) {
    await waitFor(300);

    const canvas1 = await html2canvas(el1, {
      scale: window.devicePixelRatio * 2,
      useCORS: true,
      backgroundColor: null,
    });
    const canvas2 = await html2canvas(el2, {
      scale: window.devicePixelRatio * 2,
      useCORS: true,
      backgroundColor: null,
    });

    const img1 = canvas1.toDataURL('image/png');
    const img2 = canvas2.toDataURL('image/png');

    await loadImage(img1);
    await loadImage(img2);

    const imgWidth = 180;
    const imgHeightMax = 90;
    const startX = (pageWidth - imgWidth) / 2;
    let imgY = yMax + 10;

    const remainingSpace1 = pageHeight - imgY - margin;
    const imgHeight1 = Math.min(imgHeightMax, remainingSpace1 - 1);
    doc.addImage(img1, 'PNG', startX, imgY, imgWidth, imgHeight1);

    imgY += imgHeight1 + 10;

    const remainingSpace2 = pageHeight - imgY - margin;
    const imgHeight2 = Math.min(imgHeightMax, remainingSpace2 - 1);
    doc.addImage(img2, 'PNG', startX, imgY, imgWidth, imgHeight2);
  }

  // Segunda página: Respuestas
  doc.addPage();
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORME DE RESPUESTAS', pageWidth / 2, margin, { align: 'center' });
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  let yLeft = margin + 15;
  let yRight = margin + 15;

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

    [...qLines, ...aLines].forEach(line => {
      doc.text(line, x, y);
      y += lineHeight;
    });

    if (isLeft) yLeft = y + lineHeight;
    else yRight = y + lineHeight;
  });

  const blob = doc.output('blob');
  return { doc, blob };
};
