export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://rabbit-api-two.vercel.app/api/random?t=${Date.now()}`,
    );
    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
