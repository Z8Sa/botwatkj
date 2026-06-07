const { getDatabase, getNumber } = require("./utils");

function getRole(sender) {
    const db = getDatabase();
    const num = getNumber(sender);
    
    if (db.role.OWNER.includes(num)) return "OWNER";
    if (db.role.BENDAHARA.includes(num)) return "BENDAHARA";
    if (db.role.KETUA_KELAS.includes(num)) return "KETUA_KELAS";
    
    return "SISWA";
}

function isOwner(sender) {
    return getRole(sender) === "OWNER";
}

function isBendahara(sender) {
    const role = getRole(sender);
    return role === "BENDAHARA" || role === "OWNER";
}

function isKetuaKelas(sender) {
    const role = getRole(sender);
    return role === "KETUA_KELAS" || role === "OWNER";
}

function canManageSiswa(sender) {
    const role = getRole(sender);
    return role === "OWNER" || role === "KETUA_KELAS";
}

module.exports = {
    getRole,
    isOwner,
    isBendahara,
    isKetuaKelas,
    canManageSiswa
};