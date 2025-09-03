// backend/server.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // <-- yaha apna API key env me dalna hoga
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await client.responses.create({
      model: "gpt-5",
      input: message,
    });
    res.json({ reply: response.output_text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
