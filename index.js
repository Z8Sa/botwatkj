require("dotenv").config();
const {
    default: makeWASocket,
    useMultiFileAuthState
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const qrcode = require("qrcode-terminal");

const CONFIG = require("./config/config");
const { loadDatabase, getNumber } = require("./lib/utils");
const { getRole } = require("./lib/role");

// Import handlers
const {
    sendMenu,
    sendRole,
    sendOwnerInfo,
    sendBelajarMenu,
    sendPythonLink,
    sendAIMap,
    sendKelasTKJMenu
} = require("./handlers/menu");

const {
    sendSiswaMenu,
    handleListSiswa,
    handleTambahSiswa,
    handleHapusSiswa,
    handleIdSiswa
} = require("./handlers/siswa");

const {
    sendKasMenu,
    handleBayarKas,
    handleCekKas
} = require("./handlers/kas");

const {
    sendPiketMenu,
    sendPiketDay,
    sendRosterMenu,
    sendRosterDay
} = require("./handlers/jadwal");

const { handleAI } = require("./handlers/aiHandler");

// ================== MESSAGE HANDLER ==================
async function handleMessage(sock, msg) {
    const messageText = msg.message?.conversation || 
                       msg.message?.extendedTextMessage?.text || "";
    
    if (!messageText || !messageText.startsWith(CONFIG.COMMAND_PREFIX)) return;
    
    const command = messageText.slice(1).trim();
    const sender = msg.key.participant || msg.key.remoteJid;
    const role = getRole(sender);
    const jid = msg.key.remoteJid;
    
    console.log(`[CMD] ${command} | Sender: ${getNumber(sender)} | Role: ${role}`);
    
    // Command routing
    const commandMap = {
        // Menu commands
        menu: () => sendMenu(sock, jid),
        role: () => sendRole(sock, jid, role),
        owner: () => sendOwnerInfo(sock, jid),
        belajar: () => sendBelajarMenu(sock, jid),
        python: () => sendPythonLink(sock, jid),
        roadmapAiBuilder: () => sendAIMap(sock, jid),
        kelasTKJ: () => sendKelasTKJMenu(sock, jid),
        
        // Kas commands
        uangkas: () => sendKasMenu(sock, jid),
        
        // Siswa commands
        siswa: () => sendSiswaMenu(sock, jid),
        listsiswa: () => handleListSiswa(sock, jid),
        
        // Piket commands
        piket: () => sendPiketMenu(sock, jid),
        piketsenin: () => sendPiketDay(sock, jid, "SENIN"),
        piketselasa: () => sendPiketDay(sock, jid, "SELASA"),
        piketrabu: () => sendPiketDay(sock, jid, "RABU"),
        piketkamis: () => sendPiketDay(sock, jid, "KAMIS"),
        piketjumat: () => sendPiketDay(sock, jid, "JUMAT"),
        
        // Roster commands
        roster: () => sendRosterMenu(sock, jid),
        rostersenin: () => sendRosterDay(sock, jid, "SENIN"),
        rosterselasa: () => sendRosterDay(sock, jid, "SELASA"),
        rosterrabu: () => sendRosterDay(sock, jid, "RABU"),
        rosterkamis: () => sendRosterDay(sock, jid, "KAMIS"),
        rosterjumat: () => sendRosterDay(sock, jid, "JUMAT")
    };
    
    // Exact match commands
    if (commandMap[command]) {
        await commandMap[command]();
        return;
    }
    
    // Prefix-based commands
    if (command.startsWith("bayarkas")) {
        await handleBayarKas(sock, jid, command, sender);
        return;
    }
    
    if (command.startsWith("cekkas")) {
        await handleCekKas(sock, jid, command);
        return;
    }
    
    if (command.startsWith("tambahsiswa")) {
        await handleTambahSiswa(sock, jid, command, sender);
        return;
    }
    
    if (command.startsWith("hapussiswa")) {
        await handleHapusSiswa(sock, jid, command, sender);
        return;
    }
    
    if (command.startsWith("idsiswa")) {
        await handleIdSiswa(sock, jid, command);
        return;
    }
    
    if (command.startsWith("ai ")) {
        await handleAI(sock, jid, command);
        return;
    }
    
    await sock.sendMessage(jid, {
        text: "❌ Command tidak dikenal. Ketik .menu untuk melihat daftar perintah."
    });
}

// ================== BOT INITIALIZATION ==================
async function startBot() {
    loadDatabase();
    
    const { state, saveCreds } = await useMultiFileAuthState(CONFIG.SESSION_DIR);
    
    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" })
    });
    
    sock.ev.on("creds.update", saveCreds);
    
    sock.ev.on("connection.update", (update) => {
        const { connection, qr } = update;
        
        if (qr) {
            console.log("📱 Scan QR Code:");
            qrcode.generate(qr, { small: true });
        }
        
        if (connection === "open") {
            console.log("✅ WhatsApp Bot Connected!");
        }
        
        if (connection === "close") {
            console.log("🔄 Reconnecting...");
            startBot();
        }
    });
    
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;
        await handleMessage(sock, msg);
    });
    
    console.log("🚀 Bot is running...");
}

// Start the bot
startBot();