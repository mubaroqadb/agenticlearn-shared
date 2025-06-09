// AgenticLearn Shared UI Components dengan JSCroot
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js";

export class UIComponents {
    static createCard(title, content, actions = []) {
        return `
            <div class="card">
                <h3>${title}</h3>
                <div>${content}</div>
                ${actions.length ? `
                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        ${actions.map(action => `
                            <button class="btn" onclick="${action.handler}">${action.label}</button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    static createProgressBar(percentage, label = "") {
        return `
            <div style="margin: 1rem 0;">
                ${label ? `<div style="margin-bottom: 0.5rem;">${label}</div>` : ''}
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div style="text-align: center; margin-top: 0.25rem;">${percentage}%</div>
            </div>
        `;
    }

    static showNotification(message, type = "info") {
        const colors = {
            success: "#059669",
            error: "#dc2626",
            warning: "#d97706",
            info: "#2563eb"
        };

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: ${colors[type]};
            color: white; padding: 1rem 1.5rem; border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000;
            font-weight: 500; max-width: 300px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);

        return notification;
    }

    // Create ARIA Chat Button
    static createARIAChatButton(containerId, options = {}) {
        const defaultOptions = {
            position: 'bottom-right',
            theme: 'green',
            showOnLoad: true,
            ...options
        };

        const button = document.createElement('div');
        button.id = 'aria-chat-button';
        button.className = 'aria-floating-button';
        button.innerHTML = `
            <div class="aria-button-icon">🤖</div>
            <div class="aria-button-text">Chat dengan ARIA</div>
        `;

        // Add styles
        this.addARIAButtonStyles();

        // Position button
        this.positionARIAButton(button, defaultOptions.position);

        // Add to container or body
        const container = containerId ? document.getElementById(containerId) : document.body;
        container.appendChild(button);

        return button;
    }

    static addARIAButtonStyles() {
        if (document.getElementById('aria-button-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'aria-button-styles';
        styles.textContent = `
            .aria-floating-button {
                position: fixed;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #2E7D32, #4CAF50);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 16px rgba(46, 125, 50, 0.3);
                z-index: 999;
                transition: all 0.3s ease;
                color: white;
                font-size: 24px;
                overflow: hidden;
            }

            .aria-floating-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
                width: 180px;
                border-radius: 30px;
            }

            .aria-floating-button:hover .aria-button-text {
                opacity: 1;
                margin-left: 8px;
            }

            .aria-button-icon {
                transition: all 0.3s ease;
            }

            .aria-button-text {
                opacity: 0;
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                transition: all 0.3s ease;
                margin-left: 0;
            }

            .aria-floating-button.active {
                background: #1B5E20;
            }

            @media (max-width: 768px) {
                .aria-floating-button {
                    width: 50px;
                    height: 50px;
                    font-size: 20px;
                }

                .aria-floating-button:hover {
                    width: 50px;
                    border-radius: 50%;
                }

                .aria-floating-button:hover .aria-button-text {
                    opacity: 0;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    static positionARIAButton(button, position) {
        switch (position) {
            case 'bottom-right':
                button.style.bottom = '20px';
                button.style.right = '20px';
                break;
            case 'bottom-left':
                button.style.bottom = '20px';
                button.style.left = '20px';
                break;
            case 'top-right':
                button.style.top = '20px';
                button.style.right = '20px';
                break;
            case 'top-left':
                button.style.top = '20px';
                button.style.left = '20px';
                break;
            default:
                button.style.bottom = '20px';
                button.style.right = '20px';
        }
    }

    // Create ARIA Status Indicator
    static createARIAStatusIndicator(containerId) {
        const indicator = document.createElement('div');
        indicator.id = 'aria-status-indicator';
        indicator.className = 'aria-status-indicator';
        indicator.innerHTML = `
            <div class="aria-status-dot"></div>
            <span class="aria-status-text">ARIA Checking...</span>
        `;

        // Add styles
        this.addARIAStatusStyles();

        // Add to container
        const container = document.getElementById(containerId);
        if (container) {
            container.appendChild(indicator);
        }

        return indicator;
    }

    static addARIAStatusStyles() {
        if (document.getElementById('aria-status-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'aria-status-styles';
        styles.textContent = `
            .aria-status-indicator {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
                background: #F3F4F6;
                color: #374151;
                border: 1px solid #E5E7EB;
            }

            .aria-status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #9CA3AF;
                animation: pulse 2s infinite;
            }

            .aria-status-indicator.online .aria-status-dot {
                background: #10B981;
            }

            .aria-status-indicator.offline .aria-status-dot {
                background: #EF4444;
                animation: none;
            }

            .aria-status-indicator.testing .aria-status-dot {
                background: #F59E0B;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;

        document.head.appendChild(styles);
    }

    // Update ARIA Status
    static updateARIAStatus(status, message) {
        const indicator = document.getElementById('aria-status-indicator');
        if (!indicator) return;

        indicator.className = `aria-status-indicator ${status}`;
        indicator.querySelector('.aria-status-text').textContent = message;
    }
}
