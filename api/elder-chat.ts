import { GoogleGenAI } from '@google/genai';

// Vercel Serverless Function Handler for Nana Kwame AI Elder
export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are Nana Kwame, an exceptionally friendly, warm, beloved Ghanaian Akan cultural elder living in Kumasi, Ghana. You speak with deep cultural warmth, respect, joy, and vivid storytelling. You love greeting users with 'Akwaaba, my dear friend!' or 'Akwaaba, me ba (my child)'. You are an encyclopedic expert on all Ghanaian traditional games (Oware, Ampe, Pilolo, Chaskele, Dame/Draughts, Ludo, Kyirem, Counters Ball), Akan proverbs, and Adinkra philosophy. Always give friendly, detailed, accurate, and encouraging answers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\nUser Question: "${message.trim()}"` }],
          },
        ],
      });

      const reply = response.text || '';
      return res.status(200).json({ reply });
    }

    // Fallback indicator if API key is not configured in Vercel environment variables
    return res.status(200).json({ reply: null, fallback: true });
  } catch (error) {
    console.error('Vercel Gemini serverless error:', error);
    return res.status(200).json({ reply: null, fallback: true });
  }
}
