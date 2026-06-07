
# 🤖 WhatsApp Bot TKJ

Bot WhatsApp berbasis Node.js + Baileys untuk manajemen kelas TKJ:
- Data siswa
- Uang kas kelas
- Jadwal piket & roster
- AI assistant

---

## ✨ Fitur

👨‍🎓 Manajemen Siswa
- tambah siswa
- hapus siswa
- list siswa
- cek data siswa

💰 Uang Kas
- input kas
- cek total kas
- riwayat pembayaran

📅 Jadwal Kelas
- piket harian
- roster pelajaran

🤖 AI Assistant
- chat AI langsung dari WhatsApp

---

## 📱 Menu Bot

Ketik:
```

.menu

```

Hasil:
```

╔════ BOT TKJ ════╗
║ .menu
║ .owner
║ .belajar
║ .kelasTKJ
║ .siswa
║ .uangkas
║ .ai <pertanyaan>
╚═══════════════════╝

```

---

## 🚀 Cara Install

### 1. Install Node.js
https://nodejs.org

### Install Git (Windows)
https://git-scm.com/downloads

Linux:
```

sudo apt update
sudo apt install git -y

```

---

### 2. Clone Repository
```

git clone [https://github.com/Z8Sa/botwatkj.git](https://github.com/Z8Sa/botwatkj.git)
cd botwatkj

```

---

### 3. Install Dependency
```

npm install

```

Jika manual:
```

npm install @whiskeysockets/baileys axios pino qrcode-terminal

```

---

### 4. Jalankan Bot
```

node index.js

```

---

### 5. Scan QR Code
WhatsApp → Linked Devices → Scan QR di terminal

---

## ⚠️ Catatan
- jangan hapus folder session
- pastikan internet stabil
- bot auto restart jika disconnect

---

## 🧠 Teknologi
- Node.js
- Baileys WhatsApp API
- Groq AI

---

## 👨‍💻 Developer
RAFI

---

## 📌 Contoh Command

Siswa:
```

.siswa

```

Kas:
```

.uangkas

```

Tambah siswa:
```

.tambahsiswa nama

```

Bayar kas:
```

.bayarkas nama 5000

```

AI:
```

.ai apa itu node js

```
```
