# 🎣 Fishing Predictor

A modern, comprehensive fishing conditions predictor that combines tide data, weather forecasts, and astronomical information to help anglers plan their fishing trips.

## ✨ Features

- **7-Day Tide Predictions** - High/low tide times and heights from NOAA
- **Weather Forecasts** - Detailed 7-day weather from Weather.gov
- **Moon & Sun Data** - Moon phases, sunrise/sunset times
- **500+ Tide Stations** - Coverage of all US coastal areas
- **Mobile Responsive** - Works great on phones, tablets, and desktops
- **Fast & Modern** - ES6+ JavaScript, modular architecture
- **Secure API Handling** - Backend proxy protects API keys

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Visual Crossing API key (free tier available at https://www.visualcrossing.com/weather-api)

### Installation

1. **Clone and checkout the refactor branch**
   ```bash
   git clone https://github.com/WarriorGoat/FishingPredictor.git
   cd FishingPredictor
   git checkout feature/modern-refactor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your Visual Crossing API key
   ```

4. **Start the server**
   ```bash
   npm start
   # Visit http://localhost:3000
   ```

## 📁 Project Structure

```
├── public/              Static files
│   ├── index.html
│   └── assets/         CSS, JS, images
├── server/             Express backend (API proxy)
├── src/                Source modules
├── package.json
└── .env               Environment variables (not in git)
```

## 🛠️ Tech Stack

- **Frontend:** Vanilla JS (ES6+), Bootstrap 5.3
- **Backend:** Node.js, Express
- **APIs:** NOAA Tides, Weather.gov, Visual Crossing

## 📝 Deployment

**For production, deploy to:**
- Render.com (recommended - free tier)
- Railway.app
- Heroku
- Any Node.js hosting

**Set environment variable:** `VISUAL_CROSSING_API_KEY`

**Note:** GitHub Pages alone won't work as it doesn't support backend servers.

## 🔐 Security

✅ API keys in environment variables
✅ Backend proxy protects keys
✅ No sensitive data in client code

## 📧 Contact

- GitHub: [@WarriorGoat](https://github.com/WarriorGoat)
- Issues: [Report bugs](https://github.com/WarriorGoat/FishingPredictor/issues)

---

**⚠️ This is the modernized version.** Original version available on `main` branch.

Made with ❤️ for anglers everywhere
