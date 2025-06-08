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
}
