const { getDatabase, saveDatabase, formatNumber, formatDate } = require("../lib/utils");
const { isBendahara } = require("../lib/role");

async function sendKasMenu(sock, jid) {
    const menu = `╔══ MENU KAS ══╗
║ .bayarkas
║ .cekkas
╚═══════════════╝`;
    
    await sock.sendMessage(jid, { text: menu });
}

async function handleBayarKas(sock, jid, command, sender) {
    if (!isBendahara(sender)) {
        await sock.sendMessage(jid, {
            text: "❌ Akses ditolak, kamu bukan bendahara kelas"
        });
        return;
    }
    
    const input = command.replace("bayarkas", "").trim();
    
    if (!input) {
        await sock.sendMessage(jid, {
            text: `📌 CARA PAKAI BAYAR KAS

Format:
.bayarkas <nama> <jumlah>

Contoh:
.bayarkas rafi 5000
.bayarkas sulkifli 7500
.bayarkas messi 10000

Note:
- Nama tanpa spasi
- Jumlah harus angka`
        });
        return;
    }
    
    const parts = input.split(" ");
    const nama = parts[0];
    const jumlah = parts[1];
    
    const db = getDatabase();
    
    if (!db.siswa.includes(nama)) {
        await sock.sendMessage(jid, {
            text: "❌ Nama tidak terdaftar di database siswa. Pastikan sudah ditambahkan oleh bendahara"
        });
        return;
    }
    
    if (!db.uangKas[nama]) {
        db.uangKas[nama] = { total: 0, history: [] };
    }
    
    if (!Array.isArray(db.uangKas[nama].history)) {
        db.uangKas[nama].history = [];
    }
    
    db.uangKas[nama].total += parseInt(jumlah);
    db.uangKas[nama].history.push({
        jumlah: parseInt(jumlah),
        by: "BENDAHARA",
        waktu: formatDate()
    });
    
    saveDatabase();
    
    await sock.sendMessage(jid, {
        text: `💰 ${nama} +${formatNumber(jumlah)}\nTotal: ${formatNumber(db.uangKas[nama].total)}`
    });
}

async function handleCekKas(sock, jid, command) {
    const input = command.replace("cekkas", "").trim();
    const db = getDatabase();
    
    if (!input) {
        let daftar = Object.entries(db.uangKas || {})
            .map(([nama, data]) => `- ${nama}: ${formatNumber(data.total)}`)
            .join("\n");
        
        if (!daftar) daftar = "Belum ada data kas.";
        
        await sock.sendMessage(jid, {
            text: `📊 DATA UANG KAS\n\n${daftar}\n\n🔎 Detail:\n.cekkas namaSiswa`
        });
        return;
    }
    
    const nama = input;
    const data = db.uangKas?.[nama];
    
    if (!data) {
        await sock.sendMessage(jid, { text: "❌ Data kas tidak ditemukan." });
        return;
    }
    
    const history = data.history
        .map(h => `• ${formatNumber(h.jumlah)} | ${h.by} | ${h.waktu}`)
        .join("\n");
    
    await sock.sendMessage(jid, {
        text: `📊 DETAIL KAS: ${nama}\n\n💰 Total: ${formatNumber(data.total)}\n\n📜 History:\n${history}`
    });
}

module.exports = {
    sendKasMenu,
    handleBayarKas,
    handleCekKas
};