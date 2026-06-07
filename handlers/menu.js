const CONFIG = require("../config/config");

async function sendMenu(sock, jid) {
    const menu = `╔════ BOT TKJ ════╗
║ .menu
║ .owner
║ .belajar
║ .kelasTKJ
║ .role
║ .ai <pertanyaan>
╚═══════════════════╝`;
    
    await sock.sendMessage(jid, { text: menu });
}

async function sendRole(sock, jid, role) {
    await sock.sendMessage(jid, { text: `🎭 Role kamu: ${role}` });
}

async function sendOwnerInfo(sock, jid) {
    const info = `╔════ OWNER BOT ════╗
║ Nama   : ${CONFIG.OWNER_NAME}
║ Status : Developer Bot
║ WhatsApp: wa.me/${CONFIG.OWNER_PHONE}
║ GitHub : ${CONFIG.OWNER_GITHUB}
╚═══════════════════╝`;
    
    await sock.sendMessage(jid, { text: info });
}

async function sendBelajarMenu(sock, jid) {
    const menu = `╔════ MENU BELAJAR ════╗
║ .roadmapAiBuilder
║ .python
║ .javascript
╚═══════════════════╝`;
    
    await sock.sendMessage(jid, { text: menu });
}

async function sendPythonLink(sock, jid) {
    await sock.sendMessage(jid, { 
        text: "YOUTUBE : \nhttps://youtube.com/playlist?list=PLZS-MHyEIRo59lUBwU-XHH7Ymmb04ffOY&si=pImXCdcevLTAXIYX" 
    });
}

async function sendAIMap(sock, jid) {
    const roadmap = `╔══ ROADMAP AI BUILDER ══╗

[PONDASI]
1. Python
- Variable
- Function
- Loop
- List & Dictionary
- File handling
- OOP dasar
- API request

2. Logic & Problem Solving
- Input → Process → Output
- Workflow thinking
- Automation logic

3. Git & GitHub
- Repository
- Commit
- Push
- Branch dasar

-----------------------------------

[AI & AUTOMATION]
4. API
- REST API
- JSON
- Request & Response
- OpenAI API
- Claude API
- Gemini API

5. Automation Tools
- n8n
- Make
- Zapier

6. Database
- PostgreSQL
- Supabase
- Firebase dasar

-----------------------------------

[BACKEND & SYSTEM]
7. Backend Development
- FastAPI (Python)
- Endpoint
- Authentication dasar
- CRUD

8. Frontend Basic
- HTML
- CSS
- JavaScript
- React basic

-----------------------------------

[ADVANCED AI]
9. AI Agents
- Tool calling
- AI workflow
- Multi-step automation
- Memory system

10. Vector Database
- Embedding
- RAG
- Knowledge base AI

11. Deployment & Cloud
- Railway
- Render
- Vercel
- Docker basic

╚═══════════════════╝`;

    await sock.sendMessage(jid, { text: roadmap });
}

async function sendKelasTKJMenu(sock, jid) {
    const menu = `╔══ KELAS TKJ ══╗
║ .roster
║ .piket
║ .idsiswa
║ .uangkas
║ .siswa
╚═══════════════╝`;
    
    await sock.sendMessage(jid, { text: menu });
}

module.exports = {
    sendMenu,
    sendRole,
    sendOwnerInfo,
    sendBelajarMenu,
    sendPythonLink,
    sendAIMap,
    sendKelasTKJMenu
};