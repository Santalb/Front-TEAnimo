export const sendPdfToEmail = async (email, blob) => {
  const formData = new FormData();
  formData.append('file', blob, 'informe_evaluacion.pdf');
  formData.append('destinatario', email);

  const res = await fetch('http://localhost:8000/enviar-pdf', {
    method: 'POST',
    body: formData,
  });

  const result = await res.json();
  return { ok: res.ok, result };
};
