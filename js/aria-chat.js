// ARIA Chat Component - AI Tutor Interface
import { apiClient } from './api-client.js';

export class ARIAChat {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.sessionId = null;
        this.isTyping = false;
        this.carbonFootprint = 0;
        
        this.options = {
            theme: 'green',
            showSuggestions: true,
            showCarbonTracker: true,
            autoScroll: true,
            maxMessages: 100,
            typingDelay: 1000,
            ...options
        };

        this.init();
    }

    init() {
        this.createChatInterface();
        this.bindEvents();
        this.startSession();
        console.log('🤖 ARIA Chat initialized');
    }

    createChatInterface() {
        this.container.innerHTML = `
            <div class="aria-chat-container">
                <!-- Header -->
                <div class="aria-chat-header">
                    <div class="aria-avatar">
                        <div class="aria-status online"></div>
                        🤖
                    </div>
                    <div class="aria-info">
                        <h3>ARIA</h3>
                        <p>AI Tutor untuk Green Computing</p>
                    </div>
                    <div class="aria-controls">
                        <button class="aria-btn-minimize" title="Minimize">−</button>
                        <button class="aria-btn-close" title="Close">×</button>
                    </div>
                </div>

                <!-- Carbon Tracker -->
                ${this.options.showCarbonTracker ? `
                <div class="aria-carbon-tracker">
                    <span class="carbon-icon">🌱</span>
                    <span class="carbon-text">Carbon: <span id="aria-carbon">0.000g</span> CO2</span>
                </div>
                ` : ''}

                <!-- Messages Area -->
                <div class="aria-messages" id="aria-messages">
                    <div class="aria-message aria-message-bot">
                        <div class="aria-message-avatar">🤖</div>
                        <div class="aria-message-content">
                            <div class="aria-message-text">
                                Halo! Saya ARIA, asisten AI Anda untuk belajar Green Computing. 
                                Ada yang bisa saya bantu hari ini? 🌱
                            </div>
                            <div class="aria-message-time">${this.formatTime(new Date())}</div>
                        </div>
                    </div>
                </div>

                <!-- Suggestions -->
                ${this.options.showSuggestions ? `
                <div class="aria-suggestions" id="aria-suggestions">
                    <div class="suggestion-item" data-text="Apa itu Green Computing?">
                        💡 Apa itu Green Computing?
                    </div>
                    <div class="suggestion-item" data-text="Bagaimana cara menghemat energi komputer?">
                        ⚡ Tips hemat energi
                    </div>
                    <div class="suggestion-item" data-text="Ceritakan tentang carbon footprint IT">
                        🌍 Carbon footprint IT
                    </div>
                </div>
                ` : ''}

                <!-- Typing Indicator -->
                <div class="aria-typing" id="aria-typing" style="display: none;">
                    <div class="aria-message-avatar">🤖</div>
                    <div class="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="aria-input-area">
                    <div class="aria-input-container">
                        <input 
                            type="text" 
                            id="aria-input" 
                            placeholder="Tanyakan tentang Green Computing..."
                            maxlength="500"
                        />
                        <button id="aria-send" class="aria-send-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="aria-input-footer">
                        <span class="char-count">0/500</span>
                        <span class="powered-by">Powered by ARIA AI</span>
                    </div>
                </div>
            </div>
        `;

        this.addStyles();
    }

    addStyles() {
        if (document.getElementById('aria-chat-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'aria-chat-styles';
        styles.textContent = `
            .aria-chat-container {
                width: 100%;
                max-width: 400px;
                height: 600px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            }

            .aria-chat-header {
                background: linear-gradient(135deg, #2E7D32, #4CAF50);
                color: white;
                padding: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .aria-avatar {
                position: relative;
                font-size: 24px;
                width: 40px;
                height: 40px;
                background: rgba(255,255,255,0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .aria-status {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 12px;
                height: 12px;
                background: #4CAF50;
                border: 2px solid white;
                border-radius: 50%;
            }

            .aria-status.online {
                background: #4CAF50;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }

            .aria-info h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
            }

            .aria-info p {
                margin: 0;
                font-size: 12px;
                opacity: 0.9;
            }

            .aria-controls {
                margin-left: auto;
                display: flex;
                gap: 8px;
            }

            .aria-controls button {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .aria-carbon-tracker {
                background: #E8F5E8;
                padding: 8px 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 12px;
                color: #2E7D32;
                border-bottom: 1px solid #E0E0E0;
            }

            .aria-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .aria-message {
                display: flex;
                gap: 8px;
                max-width: 85%;
            }

            .aria-message-user {
                align-self: flex-end;
                flex-direction: row-reverse;
            }

            .aria-message-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                flex-shrink: 0;
            }

            .aria-message-bot .aria-message-avatar {
                background: #E8F5E8;
            }

            .aria-message-user .aria-message-avatar {
                background: #2E7D32;
                color: white;
            }

            .aria-message-content {
                flex: 1;
            }

            .aria-message-text {
                background: #F5F5F5;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.4;
                word-wrap: break-word;
            }

            .aria-message-user .aria-message-text {
                background: #2E7D32;
                color: white;
            }

            .aria-message-time {
                font-size: 11px;
                color: #666;
                margin-top: 4px;
                padding: 0 16px;
            }

            .aria-suggestions {
                padding: 8px 16px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                border-top: 1px solid #E0E0E0;
                background: #FAFAFA;
            }

            .suggestion-item {
                background: white;
                border: 1px solid #E0E0E0;
                border-radius: 20px;
                padding: 8px 12px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
                color: #2E7D32;
            }

            .suggestion-item:hover {
                background: #E8F5E8;
                border-color: #4CAF50;
            }

            .aria-typing {
                display: flex;
                gap: 8px;
                padding: 0 16px;
                align-items: center;
            }

            .typing-dots {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
                background: #F5F5F5;
                border-radius: 18px;
            }

            .typing-dots span {
                width: 6px;
                height: 6px;
                background: #666;
                border-radius: 50%;
                animation: typing 1.4s infinite;
            }

            .typing-dots span:nth-child(2) {
                animation-delay: 0.2s;
            }

            .typing-dots span:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
                30% { transform: translateY(-10px); opacity: 1; }
            }

            .aria-input-area {
                border-top: 1px solid #E0E0E0;
                background: white;
            }

            .aria-input-container {
                display: flex;
                padding: 16px;
                gap: 8px;
                align-items: center;
            }

            #aria-input {
                flex: 1;
                border: 1px solid #E0E0E0;
                border-radius: 24px;
                padding: 12px 16px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s;
            }

            #aria-input:focus {
                border-color: #4CAF50;
            }

            .aria-send-btn {
                width: 40px;
                height: 40px;
                background: #2E7D32;
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }

            .aria-send-btn:hover {
                background: #1B5E20;
            }

            .aria-send-btn:disabled {
                background: #CCCCCC;
                cursor: not-allowed;
            }

            .aria-input-footer {
                display: flex;
                justify-content: space-between;
                padding: 0 16px 12px;
                font-size: 11px;
                color: #666;
            }

            /* Responsive */
            @media (max-width: 480px) {
                .aria-chat-container {
                    height: 100vh;
                    max-width: 100%;
                    border-radius: 0;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    bindEvents() {
        const input = document.getElementById('aria-input');
        const sendBtn = document.getElementById('aria-send');
        const suggestions = document.getElementById('aria-suggestions');

        // Send message on Enter or button click
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        sendBtn.addEventListener('click', () => this.sendMessage());

        // Character counter
        input.addEventListener('input', (e) => {
            const charCount = e.target.value.length;
            document.querySelector('.char-count').textContent = `${charCount}/500`;
        });

        // Suggestion clicks
        if (suggestions) {
            suggestions.addEventListener('click', (e) => {
                if (e.target.classList.contains('suggestion-item')) {
                    const text = e.target.dataset.text;
                    input.value = text;
                    this.sendMessage();
                }
            });
        }

        // Control buttons
        document.querySelector('.aria-btn-minimize')?.addEventListener('click', () => {
            this.container.style.display = 'none';
        });

        document.querySelector('.aria-btn-close')?.addEventListener('click', () => {
            this.container.remove();
        });
    }

    async startSession() {
        try {
            const response = await apiClient.ariaCreateSession(
                ['Green Computing', 'Sustainability', 'Energy Efficiency'],
                { source: 'web_chat', timestamp: new Date().toISOString() }
            );
            
            this.sessionId = response.session_id;
            console.log('🤖 ARIA session started:', this.sessionId);
        } catch (error) {
            console.error('Failed to start ARIA session:', error);
            this.addMessage('bot', 'Maaf, terjadi kesalahan saat memulai sesi. Silakan refresh halaman.', true);
        }
    }

    async sendMessage() {
        const input = document.getElementById('aria-input');
        const message = input.value.trim();

        if (!message || this.isTyping) return;

        // Add user message
        this.addMessage('user', message);
        input.value = '';
        document.querySelector('.char-count').textContent = '0/500';

        // Show typing indicator
        this.showTyping();

        try {
            let response;

            // Try API client first
            try {
                response = await apiClient.ariaChatMessage(message, this.sessionId);
            } catch (apiError) {
                console.warn('API client failed, trying direct backend call:', apiError);

                // Fallback to direct backend call
                response = await this.directBackendCall(message);
            }

            // Update carbon footprint
            this.updateCarbonFootprint(response.data?.response_time || 0);

            // Hide typing and add bot response
            this.hideTyping();

            // Handle different response formats
            const ariaResponse = response.data?.aria_response || response.aria_response ||
                               this.generateFallbackResponse(message);

            this.addMessage('bot', ariaResponse);

            // Update suggestions
            const suggestions = response.suggestions || this.generateFallbackSuggestions();
            if (suggestions && this.options.showSuggestions) {
                this.updateSuggestions(suggestions);
            }

        } catch (error) {
            console.error('ARIA chat error:', error);
            this.hideTyping();

            // Generate intelligent fallback response based on message content
            const fallbackResponse = this.generateIntelligentFallback(message);
            this.addMessage('bot', fallbackResponse, false);
        }
    }

    async directBackendCall(message) {
        const token = this.getCookie('login') || this.getCookie('access_token');
        const baseURL = window.location.hostname.includes('localhost')
            ? 'http://localhost:8080/api/v1'
            : 'https://agenticlearn-backend-production.up.railway.app/api/v1';

        const response = await fetch(`${baseURL}/aria/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify({
                message: message,
                session_id: this.sessionId
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    generateIntelligentFallback(message) {
        const lowerMessage = message.toLowerCase();

        // Greeting responses
        if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hello')) {
            return '🤖 Halo! Saya ARIA, asisten AI untuk Green Computing. Meskipun sedang ada gangguan koneksi, saya tetap bisa membantu dengan informasi dasar. Apa yang ingin Anda ketahui tentang teknologi berkelanjutan?';
        }

        // Green computing questions
        if (lowerMessage.includes('green computing') || lowerMessage.includes('hijau')) {
            return '🌱 Green Computing adalah praktik menggunakan teknologi komputer secara ramah lingkungan. Ini meliputi: 1) Mengurangi konsumsi energi, 2) Meminimalkan limbah elektronik, 3) Mengoptimalkan efisiensi sistem, 4) Menggunakan renewable energy. Apakah ada aspek tertentu yang ingin Anda pelajari?';
        }

        // Energy efficiency questions
        if (lowerMessage.includes('energi') || lowerMessage.includes('listrik') || lowerMessage.includes('hemat')) {
            return '⚡ Tips menghemat energi komputer: 1) Gunakan mode sleep/hibernate, 2) Atur brightness layar sesuai kebutuhan, 3) Tutup aplikasi yang tidak digunakan, 4) Pilih hardware yang energy-efficient, 5) Gunakan SSD daripada HDD. Mau tahu lebih detail tentang salah satunya?';
        }

        // Carbon footprint questions
        if (lowerMessage.includes('carbon') || lowerMessage.includes('emisi') || lowerMessage.includes('lingkungan')) {
            return '🌍 Carbon footprint IT dihitung dari konsumsi energi perangkat, emisi produksi hardware, dan penggunaan data center. Untuk menguranginya: gunakan cloud computing yang efisien, optimalkan kode software, dan pilih provider yang menggunakan renewable energy.';
        }

        // Help requests
        if (lowerMessage.includes('bantu') || lowerMessage.includes('help') || lowerMessage.includes('tolong')) {
            return '🆘 Tentu saja! Meskipun sedang offline mode, saya bisa membantu dengan topik: 1) Green Computing basics, 2) Energy efficiency tips, 3) Carbon footprint calculation, 4) Sustainable programming. Topik mana yang menarik untuk Anda?';
        }

        // Default intelligent response
        return '🤖 Saya memahami pertanyaan Anda tentang "' + message + '". Meskipun sedang dalam mode offline, saya tetap bisa membantu dengan informasi dasar Green Computing. Coba tanyakan tentang: energy efficiency, carbon footprint, atau sustainable computing practices.';
    }

    generateFallbackResponse(message) {
        return '🤖 Terima kasih atas pertanyaan Anda! Saat ini saya sedang dalam mode terbatas, tapi saya tetap siap membantu Anda belajar Green Computing. Silakan tanyakan tentang energy efficiency, carbon footprint, atau sustainable computing.';
    }

    generateFallbackSuggestions() {
        return [
            'Apa itu Green Computing?',
            'Tips menghemat energi komputer',
            'Cara menghitung carbon footprint IT'
        ];
    }

    addMessage(type, text, isError = false) {
        const messagesContainer = document.getElementById('aria-messages');
        const messageDiv = document.createElement('div');
        
        messageDiv.className = `aria-message aria-message-${type}`;
        messageDiv.innerHTML = `
            <div class="aria-message-avatar">${type === 'user' ? '👤' : '🤖'}</div>
            <div class="aria-message-content">
                <div class="aria-message-text ${isError ? 'error' : ''}">${text}</div>
                <div class="aria-message-time">${this.formatTime(new Date())}</div>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        
        if (this.options.autoScroll) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Limit messages
        const messages = messagesContainer.querySelectorAll('.aria-message');
        if (messages.length > this.options.maxMessages) {
            messages[0].remove();
        }
    }

    showTyping() {
        this.isTyping = true;
        document.getElementById('aria-typing').style.display = 'flex';
        document.getElementById('aria-send').disabled = true;
        
        if (this.options.autoScroll) {
            const messagesContainer = document.getElementById('aria-messages');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    hideTyping() {
        this.isTyping = false;
        document.getElementById('aria-typing').style.display = 'none';
        document.getElementById('aria-send').disabled = false;
    }

    updateSuggestions(suggestions) {
        const suggestionsContainer = document.getElementById('aria-suggestions');
        if (!suggestionsContainer) return;

        suggestionsContainer.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" data-text="${suggestion}">💡 ${suggestion}</div>`
        ).join('');
    }

    updateCarbonFootprint(responseTime) {
        this.carbonFootprint += (responseTime / 1000) * 0.001; // Estimate
        const carbonElement = document.getElementById('aria-carbon');
        if (carbonElement) {
            carbonElement.textContent = `${this.carbonFootprint.toFixed(3)}g`;
        }
    }

    formatTime(date) {
        return date.toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    // Public methods
    minimize() {
        this.container.style.display = 'none';
    }

    show() {
        this.container.style.display = 'block';
    }

    destroy() {
        this.container.remove();
        document.getElementById('aria-chat-styles')?.remove();
    }
}

// Export for global use
window.ARIAChat = ARIAChat;
