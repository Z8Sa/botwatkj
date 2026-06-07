const axios = require("axios");
const CONFIG = require("../config/config");

let lastAITime = 0;

async function askAI(text) {
    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: CONFIG.AI_MODEL,
                messages: [
                    { role: "system", content: "Kamu asisten singkat dan jelas." },
                    { role: "user", content: text }
                ],
                temperature: CONFIG.AI_TEMPERATURE
            },
            {
                headers: {
                    "Authorization": `Bearer ${CONFIG.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        
        return response.data.choices[0].message.content;
    } catch (err) {
        const status = err.response?.status;
        const errorMsg = err.response?.data?.error?.message || err.message;
        
        if (status === 429 || errorMsg.toLowerCase().includes("rate limit")) {
            return "Maaf, AI sedang sibuk. Silakan coba lagi nanti.";
        }
        
        console.log(err.response?.data || err.message);
        return "AI error: " + errorMsg;
    }
}

module.exports = { askAI };