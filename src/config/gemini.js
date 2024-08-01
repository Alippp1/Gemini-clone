import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = "AIzaSyAhZrqk90BE_uZJEWSWgPJOSCOGBarsm4w";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_LOW },

  ];
  
  const run = async (prompt) => {
    try {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });
  
      const result = await chatSession.sendMessage(prompt);
      const response = result.response;
      console.log(response.text());
      return response.text();
    } catch (error) {
      console.error("Error during chat session:", error);
    }
  };
  
  export default run;
  