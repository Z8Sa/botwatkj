require("dotenv").config();

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const qrcode = require("qrcode-terminal");

const CONFIG = require("./config/config");
const { loadDatabase, getNumber } = require("./lib/utils");
const { getRole } = require("./lib/role");

// ================== HANDLERS ==================
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
    const messageText =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        "";

    if (!messageText.startsWith(CONFIG.COMMAND_PREFIX)) return;

    const command = messageText.slice(1).trim();
    const sender = msg.key.participant || msg.key.remoteJid;
    const jid = msg.key.remoteJid;
    const role = getRole(sender);

    console.log(`[CMD] ${command} | ${getNumber(sender)} | ${role}`);

    const commandMap = {
        menu: () => sendMenu(sock, jid),
        role: () => sendRole(sock, jid, role),
        owner: () => sendOwnerInfo(sock, jid),
        belajar: () => sendBelajarMenu(sock, jid),
        python: () => sendPythonLink(sock, jid),
        roadmapAiBuilder: () => sendAIMap(sock, jid),
        kelasTKJ: () => sendKelasTKJMenu(sock, jid),

        uangkas: () => sendKasMenu(sock, jid),

        siswa: () => sendSiswaMenu(sock, jid),
        listsiswa: () => handleListSiswa(sock, jid),

        piket: () => sendPiketMenu(sock, jid),
        piketsenin: () => sendPiketDay(sock, jid, "SENIN"),
        piketselasa: () => sendPiketDay(sock, jid, "SELASA"),
        piketrabu: () => sendPiketDay(sock, jid, "RABU"),
        piketkamis: () => sendPiketDay(sock, jid, "KAMIS"),
        piketjumat: () => sendPiketDay(sock, jid, "JUMAT"),

        roster: () => sendRosterMenu(sock, jid),
        rostersenin: () => sendRosterDay(sock, jid, "SENIN"),
        rosterselasa: () => sendRosterDay(sock, jid, "SELASA"),
        rosterrabu: () => sendRosterDay(sock, jid, "RABU"),
        rosterkamis: () => sendRosterDay(sock, jid, "KAMIS"),
        rosterjumat: () => sendRosterDay(sock, jid, "JUMAT")
    };

    if (commandMap[command]) {
        return await commandMap[command]();
    }

    if (command.startsWith("bayarkas")) {
        return await handleBayarKas(sock, jid, command, sender);
    }

    if (command.startsWith("cekkas")) {
        return await handleCekKas(sock, jid, command);
    }

    if (command.startsWith("tambahsiswa")) {
        return await handleTambahSiswa(sock, jid, command, sender);
    }

    if (command.startsWith("hapussiswa")) {
        return await handleHapusSiswa(sock, jid, command, sender);
    }

    if (command.startsWith("idsiswa")) {
        return await handleIdSiswa(sock, jid, command);
    }

    if (command.startsWith("ai ")) {
        return await handleAI(sock, jid, command);
    }

    await sock.sendMessage(jid, {
        text: "❌ Command tidak dikenal. Ketik .menu"
    });
}

// ================== BOT INIT ==================
async function startBot() {
    loadDatabase();

    const { state, saveCreds } = await useMultiFileAuthState(CONFIG.SESSION_DIR);

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" }),
        printQRInTerminal: true
    });

    sock.ev.on("creds.update", saveCreds);

    let reconnectCount = 0;

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log("📱 QR TERDETEKSI:");
            qrcode.generate(qr, { small: true });
        }

        if (connection === "open") {
            reconnectCount = 0;
            console.log("✅ BOT CONNECTED");
        }

        if (connection === "close") {
            const statusCode = lastDisconnect?.error?.output?.statusCode;

            console.log("❌ Connection closed:", statusCode);

            const shouldReconnect =
                statusCode !== DisconnectReason.loggedOut;

            if (!shouldReconnect) {
                console.log("🚫 Session invalid. Hapus folder session lalu login ulang.");
                return;
            }

            reconnectCount++;

            const delay = Math.min(1000 * reconnectCount, 2000);

            console.log(`🔄 Reconnecting in ${delay / 1000}s...`);

            setTimeout(() => {
                startBot();
            }, delay);
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;
        await handleMessage(sock, msg);
    });

    console.log("🚀 Bot is running...");
}

startBot();