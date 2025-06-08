# 🌱 AgenticLearn Shared Components

JSCroot-powered shared library untuk aplikasi AgenticLearn dengan dukungan Green Computing.

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

## 📁 Structure

```
agenticlearn-shared/
├── js/
│   ├── api-client.js      # Carbon-efficient API wrapper
│   └── ui-components.js   # Reusable UI elements
├── css/
│   └── green-components.css # Green computing CSS
├── docs/
│   ├── README.md          # Full documentation
│   ├── quick-start.md     # Quick start guide
│   └── example.html       # Interactive demo
└── index.html             # Documentation homepage
```

## 🌱 Green Computing Features

- ✅ **Carbon Footprint Tracking**: Real-time monitoring setiap API request
- ✅ **Optimized Requests**: Minimal data transfer dan caching
- ✅ **Efficient DOM**: Minimal manipulation untuk performa optimal
- ✅ **Green CSS**: Optimized animations dan transitions
- ✅ **JSCroot Integration**: Leveraging JSCroot untuk optimasi

## 📚 Documentation

- [📖 Full Documentation](./docs/README.md)
- [🚀 Quick Start Guide](./docs/quick-start.md)
- [🎮 Interactive Demo](./docs/example.html)

## 🔧 Usage in Projects

### AgenticLearn Admin
```javascript
import { apiClient, UIComponents } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/api-client.js";
```

### AgenticLearn Student
```javascript
import { apiClient, UIComponents } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/api-client.js";
```

### AgenticLearn Backend Integration
Compatible dengan Go backend API endpoints.

## 🌍 CDN Usage

Komponen dapat digunakan langsung dari GitHub Pages:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://YOUR_USERNAME.github.io/agenticlearn-shared/css/green-components.css">

<!-- JavaScript Modules -->
<script type="module">
  import { apiClient } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/api-client.js";
  import { UIComponents } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/ui-components.js";
</script>
```

## 🔄 Development

### Local Development
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/agenticlearn-development.git
cd agenticlearn-development/agenticlearn-shared

# Serve locally
python -m http.server 8000
# atau
npx serve .
```

### Testing
```bash
# Open browser
open http://localhost:8000/docs/example.html
```

## 📊 Carbon Metrics

Contoh output carbon tracking:
```javascript
const metrics = apiClient.getCarbonMetrics();
console.log(metrics);
// Output:
// {
//   totalRequests: 15,
//   totalCarbon: 0.002341,
//   averageCarbon: 0.000156,
//   efficiency: 6410.25
// }
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/new-component`
3. Commit changes: `git commit -m "Add new component"`
4. Push branch: `git push origin feature/new-component`
5. Submit Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Related Projects

- [AgenticLearn Admin](../agenticlearn-admin/)
- [AgenticLearn Student](../agenticlearn-student/)
- [AgenticLearn Backend](../agenticlearn-backend/)

---

**Built with 🌱 Green Computing principles and JSCroot optimization**
