# 🚀 AgenticLearn Shared Components - Quick Start

## Langkah 1: Import API Client

```javascript
import { apiClient } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/api-client.js";

const data = await apiClient.request("/auth/me");
console.log("Carbon footprint:", apiClient.getCarbonMetrics());
```

## Langkah 2: Import UI Components

```javascript
import { UIComponents } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/ui-components.js";

UIComponents.showNotification("Success!", "success");
```

## Langkah 3: Import CSS

```html
<link rel="stylesheet" href="https://YOUR_USERNAME.github.io/agenticlearn-shared/css/green-components.css">
```

## Contoh Lengkap

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My AgenticLearn App</title>
    
    <!-- Import CSS -->
    <link rel="stylesheet" href="https://YOUR_USERNAME.github.io/agenticlearn-shared/css/green-components.css">
</head>
<body>
    <div id="app">
        <h1>My Learning App</h1>
        <div id="content"></div>
    </div>

    <script type="module">
        // Import components
        import { apiClient } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/api-client.js";
        import { UIComponents } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/ui-components.js";

        async function init() {
            try {
                // Make API call
                const userData = await apiClient.request("/auth/me");
                
                // Create UI
                const cardHTML = UIComponents.createCard(
                    `Welcome, ${userData.user.name}!`,
                    "Your learning dashboard is ready.",
                    [
                        { label: "Start Learning", handler: "startLearning()" }
                    ]
                );
                
                document.getElementById("content").innerHTML = cardHTML;
                
                // Show notification
                UIComponents.showNotification("App loaded successfully!", "success");
                
                // Log carbon metrics
                console.log("🌱 Carbon metrics:", apiClient.getCarbonMetrics());
                
            } catch (error) {
                UIComponents.showNotification("Failed to load app", "error");
            }
        }

        // Global function for button
        window.startLearning = function() {
            UIComponents.showNotification("Starting your learning journey!", "info");
        };

        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>
```

## Fitur Utama

### 🌱 Carbon Footprint Tracking
- Setiap API request dilacak carbon footprintnya
- Metrics tersedia real-time
- Optimasi otomatis untuk efisiensi

### 🎨 UI Components
- Notification system
- Card components
- Progress bars
- Green-themed styling

### 📡 API Client
- Token management otomatis
- Error handling
- Request optimization
- JSCroot integration

## Ganti YOUR_USERNAME

Jangan lupa ganti `YOUR_USERNAME` dengan username GitHub Anda:

```javascript
// Ganti ini:
import { apiClient } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/api-client.js";

// Menjadi ini (contoh):
import { apiClient } from "https://mubaroq.github.io/agenticlearn-shared/js/api-client.js";
```

## Testing

Untuk testing lokal, gunakan relative path:

```javascript
// Untuk development lokal
import { apiClient } from "../agenticlearn-shared/js/api-client.js";
import { UIComponents } from "../agenticlearn-shared/js/ui-components.js";
```

## Troubleshooting

### CORS Issues
Pastikan GitHub Pages sudah aktif dan file dapat diakses publik.

### Module Import Errors
Pastikan menggunakan `type="module"` pada script tag:

```html
<script type="module">
    // Your imports here
</script>
```

### Carbon Metrics Not Updating
Pastikan memanggil `updateCarbonIndicator()` secara berkala:

```javascript
setInterval(() => {
    updateCarbonIndicator();
}, 5000);
```

## Next Steps

1. Lihat [README.md](./README.md) untuk dokumentasi lengkap
2. Cek [example.html](./example.html) untuk demo interaktif
3. Explore source code di folder `js/` dan `css/`

Happy coding! 🌱
