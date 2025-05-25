export const sendPdfToEmail = async (email, blob) => {
  const formData = new FormData();
  formData.append('file', blob, 'informe_evaluacion.pdf');
  formData.append('destinatario', email);

  // Detecta si estás en localhost (desarrollo) o producción
  const isLocalhost = window.location.hostname === 'localhost';
  const baseURL = isLocalhost
    ? 'http://localhost:8000'
    : 'https://tu-api.railway.app'; // 🔁 reemplaza con tu dominio real

  const res = await fetch(`${baseURL}/enviar-pdf`, {
    method: 'POST',
    body: formData,
  });

  const result = await res.json();
  return { ok: res.ok, result };
};
