import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are an AI Science Assistant for Zahira College Mawanella students. Answer questions clearly."
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return res.status(200).json({ text: response.text() });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}