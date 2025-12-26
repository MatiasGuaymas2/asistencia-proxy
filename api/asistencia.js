import fetch from "node-fetch";

export default async function handler(req, res) {
  const { materia, token, dni } = req.query;

  if (!materia || !token || !dni) {
    return res.status(400).send("Faltan parámetros");
  }

  const appsScriptURL =
    "https://script.google.com/macros/s/AKfycby2ruZ1IymzcvLmF_Q_qc73cUkIVnmd1WBr9LLvXccLZ-BZA-WbXoKkwY7zlKMrreO4/exec";

  const url = `${appsScriptURL}?materia=${encodeURIComponent(materia)}&token=${encodeURIComponent(token)}&dni=${encodeURIComponent(dni)}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    // Aquí solo devolvemos el mensaje, nada de HTML completo
    // Puedes ajustar según tu Apps Script, si devuelve un string simple ya está
    res.status(200).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al conectarse con el Web App");
  }
}
