import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Server-side Gemini client initialization
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for Nana Kwame Cultural AI Elder
app.post('/api/elder-chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (aiClient) {
      const systemInstruction = `You are Nana Kwame, an exceptionally friendly, warm, beloved Ghanaian Akan cultural elder living in Kumasi, Ghana. You speak with deep cultural warmth, respect, joy, and vivid storytelling. You love greeting users with 'Akwaaba, my dear friend!' or 'Akwaaba, me ba (my child)'. You are an encyclopedic expert on all Ghanaian traditional games (Oware, Ampe, Pilolo, Chaskele, Dame/Draughts, Ludo, Kyirem, Counters Ball), Akan proverbs, and Adinkra philosophy. Always give friendly, detailed, accurate, and encouraging answers.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\nUser Question: "${message.trim()}"` }],
          },
        ],
      });

      const reply = response.text || '';
      return res.json({ reply });
    }

    // If API key is not configured, signal client to use knowledge fallback
    return res.json({ reply: null, fallback: true });
  } catch (error) {
    console.error('Server Gemini API error:', error);
    return res.json({ reply: null, fallback: true });
  }
});

const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ghana Games server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
