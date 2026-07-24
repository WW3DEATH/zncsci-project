// --- GLOBAL STATE ---
let currentUser = null;
let currentUserData = null;
let currentChatUser = null;
let isLoginMode = true;
let globalBatches = {};
let globalCategories = {};
let selectedBatchId = null;

// Replace the placeholder below with your key starting with AIzaSy
const GEMINI_API_KEY = "AQ.Ab8RN6ITSuF0vOGIPdcHvzcO5K0Q510S5dQ1LgVMQwduxuKWmw";

// --- AI TUTOR DIRECT GEMINI API LOGIC ---
async function askAITutor() {
    const input = document.getElementById("ai-chat-input");
    const windowEl = document.getElementById("ai-chat-window");
    const sendBtn = document.getElementById("ai-send-btn");
    const prompt = input.value.trim();

    if (!prompt) return;

    windowEl.innerHTML += `<div class="chat-msg chat-me">${prompt}</div>`;
    input.value = "";
    sendBtn.disabled = true;
    sendBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Thinking...`;
    windowEl.scrollTop = windowEl.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${AQ.Ab8RN6ITSuF0vOGIPdcHvzcO5K0Q510S5dQ1LgVMQwduxuKWmw}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: "You are an AI Science Tutor for Zahira College Mawanella students studying Sri Lankan A/L Science (Physics, Chemistry, Biology)." }]
                },
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            const aiText = data.candidates[0].content.parts[0].text;
            windowEl.innerHTML += `<div class="chat-msg chat-ai">🤖<strong>AI Tutor:</strong><br>${aiText.replace(/\n/g, '<br>')}</div>`;
        } else if (data.error) {
            windowEl.innerHTML += `<div class="chat-msg chat-ai text-red-400">API Error: ${data.error.message || 'Failed to fetch AI response.'}</div>`;
        } else {
            windowEl.innerHTML += `<div class="chat-msg chat-ai text-red-400">Unable to generate response.</div>`;
        }
    } catch (err) {
        console.error(err);
        windowEl.innerHTML += `<div class="chat-msg chat-ai text-red-400">Error connecting to AI service.</div>`;
    } finally {
        sendBtn.disabled = false;
        sendBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Ask AI`;
        windowEl.scrollTop = windowEl.scrollHeight;
    }
}

// Expose askAITutor globally so onclick="askAITutor()" works with script type="module"
window.askAITutor = askAITutor;
// Attach all HTML button handlers to window
window.askAITutor = askAITutor;
window.toggleTheme = toggleTheme;      // Replace/add your actual function names
window.switchTab = switchTab;          // Replace/add your actual function names
window.handleLogin = handleLogin;      // Replace/add your actual function names
