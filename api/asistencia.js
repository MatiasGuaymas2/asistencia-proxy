export default async function handler(req, res) {
  const { materia, token } = req.query;

  if (!materia || !token) {
    return res.status(400).send("Faltan parámetros");
  }

  // URL de tu Web App de Google Apps Script
  const appsScriptURL =
    "https://script.google.com/macros/s/AKfycbzf-yCup_dCwoR8vA6a2gek3HXgTcRI4hNCGvlQA36k_hZu-rvZ95rZaERKnKXuSxxO/exec";

  const url = `${appsScriptURL}?materia=${encodeURIComponent(
    materia
  )}&token=${encodeURIComponent(token)}`;

  try {
    const response = await fetch(url); // usar fetch global
    let html = await response.text();

    // 🔥 Limpiar cualquier /u/X/ que Google agregue
    html = html.replace(/\/u\/\d+\//g, '/');

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al conectarse con el Web App");
  }
}
