import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the SDK with your API key
const genAI = new GoogleGenerativeAI("AQ.Ab8RN6ITSuF0vOGIPdcHvzcO5K0Q510S5dQ1LgVMQwduxuKWmw");

async function generateResponse() {
  // Use the active Gemini Flash model endpoint
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = "Explain how client-side API authentication works.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  console.log(response.text());
}

generateResponse();
