import fetch from "node-fetch";

export default async function handler(req, res) {
  const { materia, token } = req.query;

  if (!materia || !token) {
    return res.status(400).send("Faltan parámetros");
  }

  // URL de tu Web App de Google Apps Script
  const appsScriptURL =
    "https://script.google.com/macros/s/AKfycby2ruZ1IymzcvLmF_Q_qc73cUkIVnmd1WBr9LLvXccLZ-BZA-WbXoKkwY7zlKMrreO4/exec";

  const url = `${appsScriptURL}?materia=${encodeURIComponent(
    materia
  )}&token=${encodeURIComponent(token)}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    // Devuelve el HTML directamente al navegador del alumno
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al conectarse con el Web App");
  }
}