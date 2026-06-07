const { askAI } = require("../lib/ai");

async function handleAI(sock, jid, command) {
    const query = command.slice(3);
    const reply = await askAI(query);
    await sock.sendMessage(jid, { text: reply });
}

module.exports = { handleAI };