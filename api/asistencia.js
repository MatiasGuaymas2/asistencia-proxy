// No hace falta importar node-fetch
export default async function handler(req, res) {
  const { materia, token, dni } = req.query;

  if (!materia || !token || !dni) {
    return res.status(400).send("Faltan parámetros");
  }

  const appsScriptURL =
    "https://script.google.com/macros/s/AKfycbzf-yCup_dCwoR8vA6a2gek3HXgTcRI4hNCGvlQA36k_hZu-rvZ95rZaERKnKXuSxxO/exec";

  const url = `${appsScriptURL}?materia=${encodeURIComponent(materia)}&token=${encodeURIComponent(token)}&dni=${encodeURIComponent(dni)}`;

  try {
    const response = await fetch(url);
    let text = await response.text();

    // Elimina cualquier /u/1/ que Google pueda agregar
    text = text.replace(/\/u\/\d+\//g, '/');

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al conectarse con el Web App");
  }
}
