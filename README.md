
# 🤖 WhatsApp Bot TKJ

Bot WhatsApp berbasis **Node.js + Baileys** untuk membantu manajemen kelas seperti data siswa, uang kas, jadwal, dan AI assistant.

---

## ✨ Fitur Utama

### 👨‍🎓 Manajemen Siswa

* Tambah & hapus siswa
* List seluruh siswa
* Cek data siswa

### 💰 Uang Kas Kelas

* Input pembayaran kas
* Cek total kas per siswa
* Riwayat pembayaran

### 📅 Sistem Kelas

* Jadwal piket harian
* Roster pelajaran

### 🤖 AI Assistant

* Chat AI langsung dari WhatsApp (`.ai <pertanyaan>`)

---

## 📱 Contoh Menu Bot

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

## 🚀 Cara Install & Menjalankan

### 1. Install kebutuhan utama

* Node.js
  [https://nodejs.org](https://nodejs.org)

* Git (Windows)
  [https://git-scm.com/downloads](https://git-scm.com/downloads)

Linux:


sudo apt update
sudo apt install git -y
```

---

### 2. Clone Repository


git clone https://github.com/Z8Sa/botwatkj.git
cd botwatkj
```

---

### 3. Install dependency


npm install
```

Atau jika manual:


npm install @whiskeysockets/baileys axios pino qrcode-terminal
```

---

### 4. Jalankan Bot


node index.js
```

---

### 5. Scan QR Code

Buka WhatsApp → Linked Devices → Scan QR di terminal

---

## ⚠️ Catatan Penting

* Jangan hapus folder `session`
* Pastikan koneksi stabil
* Bot akan restart otomatis jika disconnect

---

## 🧠 Teknologi

* Node.js
* Baileys WhatsApp API
* Groq AI (LLaMA 3)

---

## 👨‍💻 Developer

* Nama: RAFI
* Project: WhatsApp Bot TKJ
* Stack: Node.js

---

## 📌 Preview Menu Bot

### 👥 Siswa

```
.siswa
╔══ MENU SISWA ══╗
║ .listsiswa
║ .tambahsiswa
║ .hapussiswa
╚═══════════════╝
```

### 💰 Kas

```
.uangkas
╔══ MENU KAS ══╗
║ .bayarkas
║ .cekkas
╚═══════════════╝
```

### 📅 Roster & Piket

```
.roster / .piket
╔══ MENU ══╗
║ SENIN - JUMAT
╚══════════╝
```

### 🤖 AI

```
.ai apa itu node js
