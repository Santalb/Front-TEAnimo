export const sendPdfToEmail = async (email, blob) => {
  const formData = new FormData();
  formData.append('file', blob, 'informe.pdf');
  formData.append('destinatario', email);

  const res = await fetch('http://localhost:8000/simular-upload-blob/', {
    method: 'POST',
    body: formData,
  });

  const result = await res.json();
  return { ok: res.ok, result };
};
