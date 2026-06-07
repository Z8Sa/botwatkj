const { getDatabase, saveDatabase, formatNumber } = require("../lib/utils");
const { canManageSiswa } = require("../lib/role");

async function sendSiswaMenu(sock, jid) {
    const menu = `╔══ MENU SISWA ══╗
║ .listsiswa
║ .tambahsiswa
║ .hapussiswa
╚═══════════════╝`;
    
    await sock.sendMessage(jid, { text: menu });
}

async function handleListSiswa(sock, jid) {
    const db = getDatabase();
    
    if (db.siswa.length === 0) {
        await sock.sendMessage(jid, { text: "Belum ada siswa." });
        return;
    }
    
    const list = db.siswa
        .map((s, i) => `• ${s} ( .idsiswa ${s} )`)
        .join("\n");
    
    await sock.sendMessage(jid, {
        text: `╔══ LIST SISWA ══╗\n\n${list}\n\n╚═══════════════╝`
    });
}

async function handleTambahSiswa(sock, jid, command, sender) {
    if (!canManageSiswa(sender)) {
        await sock.sendMessage(jid, {
            text: "❌ Akses ditolak. Hanya OWNER & KETUA KELAS yang bisa menambah siswa."
        });
        return;
    }
    
    const nama = command.replace("tambahsiswa", "").trim();
    
    if (!nama) {
        await sock.sendMessage(jid, { text: "Format: .tambahsiswa nama" });
        return;
    }
    
    const db = getDatabase();
    
    if (db.siswa.includes(nama)) {
        await sock.sendMessage(jid, { text: "❌ Siswa sudah ada." });
        return;
    }
    
    db.siswa.push(nama);
    saveDatabase();
    
    await sock.sendMessage(jid, { text: `✅ Siswa ditambahkan: ${nama}` });
}

async function handleHapusSiswa(sock, jid, command, sender) {
    if (!canManageSiswa(sender)) {
        await sock.sendMessage(jid, {
            text: "❌ Akses ditolak. Hanya OWNER & KETUA_KELAS."
        });
        return;
    }
    
    const nama = command.replace("hapussiswa", "").trim();
    const db = getDatabase();
    const index = db.siswa.indexOf(nama);
    
    if (index === -1) {
        await sock.sendMessage(jid, { text: "❌ Siswa tidak ditemukan." });
        return;
    }
    
    db.siswa.splice(index, 1);
    saveDatabase();
    
    await sock.sendMessage(jid, { text: `❌ Siswa dihapus: ${nama}` });
}

async function handleIdSiswa(sock, jid, command) {
    const nama = command.replace("idsiswa", "").trim();
    
    if (!nama) {
        await sock.sendMessage(jid, { text: "Format: .idsiswa <nama>" });
        return;
    }
    
    const db = getDatabase();
    
    if (!db.siswa.includes(nama)) {
        await sock.sendMessage(jid, { text: "❌ Siswa belum didaftarkan." });
        return;
    }
    
    await sock.sendMessage(jid, {
        text: `📌 DATA SISWA\n\nNama: ${nama}\nStatus: Terdaftar`
    });
}

module.exports = {
    sendSiswaMenu,
    handleListSiswa,
    handleTambahSiswa,
    handleHapusSiswa,
    handleIdSiswa
};