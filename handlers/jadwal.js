async function sendPiketMenu(sock, jid) {
    const menu = `╔══ MENU PIKET ══╗
║ .piketsenin
║ .piketselasa
║ .piketrabu
║ .piketkamis
║ .piketjumat
╚═══════════════╝`;
    
    await sock.sendMessage(jid, { text: menu });
}

async function sendPiketDay(sock, jid, day) {
    const template = `╔══ ${day} ══╗
║ nama siswa
║ nama siswa
║ nama siswa
║ nama siswa
╚═══════════════╝`;
    
    await sock.sendMessage(jid, { text: template });
}

async function sendRosterMenu(sock, jid) {
    const menu = `╔══ MENU ROSTER ══╗
║.rostersenin
║.rosterselasa
║.rostrabu
║.rosterkamis
║.rosterjumat
╚═══════════════╝`;
    
    await sock.sendMessage(jid, { text: menu });
}

async function sendRosterDay(sock, jid, day) {
    const template = `╔══ ${day} ══╗
║ MAPEL
║ MAPEL
║ MAPEL
║ MAPEL
╚═══════════════╝`;
    
    await sock.sendMessage(jid, { text: template });
}

module.exports = {
    sendPiketMenu,
    sendPiketDay,
    sendRosterMenu,
    sendRosterDay
};