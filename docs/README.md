# AgenticLearn Shared Components

Komponen-komponen yang dapat digunakan di seluruh aplikasi AgenticLearn dengan dukungan Green Computing dan JSCroot.

## Components

**APIClient**: Carbon-efficient API wrapper
**UIComponents**: Reusable UI elements
**GreenCSS**: Shared styling with green computing principles

## Carbon Tracking
All components include built-in carbon footprint tracking for green computing compliance.

## 🚀 Quick Start

### Import API Client
```javascript
import { apiClient } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/api-client.js";

const data = await apiClient.request("/auth/me");
console.log("Carbon footprint:", apiClient.getCarbonMetrics());
```

### Import UI Components
```javascript
import { UIComponents } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/ui-components.js";

UIComponents.showNotification("Success!", "success");
```

### Import CSS
```html
<link rel="stylesheet" href="https://YOUR_USERNAME.github.io/agenticlearn-shared/css/green-components.css">
```

## 📚 API Client

### Features
- ✅ Automatic token management dengan JSCroot
- ✅ Carbon footprint tracking
- ✅ Request optimization
- ✅ Error handling

### Usage Examples

```javascript
// Basic request
const userData = await apiClient.request("/auth/me");

// POST request
const newUser = await apiClient.request("/users", {
    method: "POST",
    body: { name: "John Doe", email: "john@example.com" }
});

// Get carbon metrics
const metrics = apiClient.getCarbonMetrics();
console.log(`Total requests: ${metrics.totalRequests}`);
console.log(`Carbon footprint: ${metrics.totalCarbon}g CO2`);
```

## 🎨 UI Components

### Available Components

#### Notification
```javascript
UIComponents.showNotification("Operation successful!", "success");
UIComponents.showNotification("Warning message", "warning");
UIComponents.showNotification("Error occurred", "error");
UIComponents.showNotification("Information", "info");
```

#### Card Component
```javascript
const cardHTML = UIComponents.createCard(
    "Card Title",
    "Card content here",
    [
        { label: "Action 1", handler: "handleAction1()" },
        { label: "Action 2", handler: "handleAction2()" }
    ]
);
document.getElementById("container").innerHTML = cardHTML;
```

#### Progress Bar
```javascript
const progressHTML = UIComponents.createProgressBar(75, "Loading Progress");
document.getElementById("progress-container").innerHTML = progressHTML;
```

## 🎨 CSS Classes

### Green Components
- `.green-card` - Card dengan border hijau
- `.green-btn` - Button dengan tema hijau
- `.carbon-indicator` - Indikator carbon footprint
- `.loading-green` - Loading spinner hijau

### Usage
```html
<div class="green-card">
    <h3>Green Card</h3>
    <p>Content with eco-friendly styling</p>
    <button class="green-btn">Green Action</button>
</div>
```

## 🌱 Green Computing Features

### Carbon Tracking
Setiap API request secara otomatis melacak:
- Processing time
- Data transfer size
- Estimated carbon footprint

### Optimization
- Request caching
- Efficient data structures
- Minimal DOM manipulation
- Optimized CSS animations

## 📖 Complete Example

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AgenticLearn App</title>
    <link rel="stylesheet" href="https://YOUR_USERNAME.github.io/agenticlearn-shared/css/green-components.css">
</head>
<body>
    <div id="app">
        <div id="notifications"></div>
        <div id="content"></div>
    </div>

    <script type="module">
        import { apiClient } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/api-client.js";
        import { UIComponents } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/ui-components.js";

        async function initApp() {
            try {
                // Load user data
                const userData = await apiClient.request("/auth/me");
                
                // Create UI
                const cardHTML = UIComponents.createCard(
                    `Welcome, ${userData.user.name}!`,
                    "Your personalized learning dashboard",
                    [
                        { label: "Start Learning", handler: "startLearning()" },
                        { label: "View Progress", handler: "viewProgress()" }
                    ]
                );
                
                document.getElementById("content").innerHTML = cardHTML;
                
                // Show success notification
                UIComponents.showNotification("App loaded successfully!", "success");
                
                // Display carbon metrics
                const metrics = apiClient.getCarbonMetrics();
                console.log("🌱 Carbon footprint:", metrics);
                
            } catch (error) {
                UIComponents.showNotification("Failed to load app", "error");
                console.error(error);
            }
        }

        document.addEventListener('DOMContentLoaded', initApp);
    </script>
</body>
</html>
```

## 🔧 Configuration

### API Base URL
Default: `https://agenticlearn-api-production.up.railway.app/api/v1`

Untuk mengubah base URL:
```javascript
import { AgenticAPIClient } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/api-client.js";

const customClient = new AgenticAPIClient("https://your-custom-api.com/api");
```

### Carbon Tracking
Carbon tracking dapat dikonfigurasi:
```javascript
// Disable carbon tracking
apiClient.carbonFootprint = 0;
apiClient.requestCount = 0;
```

## 📱 Browser Support
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 🤝 Contributing
1. Fork repository
2. Create feature branch
3. Test dengan semua browser
4. Submit pull request

## 📄 License
MIT License - lihat file LICENSE untuk detail lengkap.
