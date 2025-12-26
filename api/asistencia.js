// /api/asistencia.js
export default function handler(req, res) {
  const { materia, token } = req.query;

  if (!materia || !token) {
    return res.status(400).send("Faltan parámetros");
  }

  const appsScriptURL =
    "https://script.google.com/macros/s/AKfycby2ruZ1IymzcvLmF_Q_qc73cUkIVnmd1WBr9LLvXccLZ-BZA-WbXoKkwY7zlKMrreO4/exec";

  const redirectUrl = `${appsScriptURL}?materia=${encodeURIComponent(
    materia
  )}&token=${encodeURIComponent(token)}`;

  // Redirige al Web App de Google
  res.writeHead(302, { Location: redirectUrl });
  res.end();
}
