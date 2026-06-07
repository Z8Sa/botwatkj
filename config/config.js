// ================== KONFIGURASI BOT ==================
const CONFIG = {
    // API Configuration
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    AI_MODEL: "llama-3.3-70b-versatile",
    AI_TEMPERATURE: 0.7,
    
    // Bot Configuration
    COMMAND_PREFIX: ".",
    SESSION_DIR: "./session",
    DB_FILE: "./database/databases.json",
    
    // Cooldown (ms)
    AI_COOLDOWN_MS: 1000,
    
    // Owner Info
    OWNER_NAME: "Ardhy7X",
    OWNER_PHONE: "6285399180750",
    OWNER_GITHUB: "https://github.com/Z8Sa"
};

module.exports = CONFIG;