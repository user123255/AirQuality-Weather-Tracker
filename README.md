🌤️ Air Quality & Weather Tracker

Real-time weather and air quality tracking web application. Enter any city to get the current weather, 3-hour forecasts, 3-day forecast, and 72-hour air quality index (AQI).

📌 Features

🌍 Dynamic City Search – Get weather and AQI for any city worldwide.

⏱ Hourly Forecast – 3-hour interval forecasts for the next 36 hours.

📅 3-Day Forecast – Daily weather summary for the next 3 days.

🌫 Air Quality Index (AQI) – 72-hour AQI prediction with advice.

⚡ Responsive Design – Works on desktop, tablet, and mobile devices.

💻 Real-time API Integration – Uses RapidAPI for Weather, AQI, and Geocoding.

🛠️ Technologies Used

Frontend: HTML5, CSS3, JavaScript

Backend: Node.js, Express

APIs:

Weather API (weather-api167.p.rapidapi.com)

Air Quality API (air-quality.p.rapidapi.com)

Forward/Reverse Geocoding API (forward-reverse-geocoding.p.rapidapi.com)

Other Libraries: node-fetch, cors, dotenv

⚡ Getting Started
git clone <your-repo-url>
cd your-repo-folder

2. Install dependencies
npm install

Run the server
node server.js

📂 Project Structure

public/
 ├── index.html       # Frontend HTML
 ├── style.css        # CSS styles
 └── script.js        # Client-side JavaScript
server.js             # Node.js + Express backend
.env                  # Environment variables for API keys
README.md             # Project documentation

🚀 Usage

Open the web app in your browser.

Type a city name in the search box.

Click Check to fetch:

Current weather

Hourly forecast

3-day forecast

AQI for the next 72 hours

View color-coded AQI advice and weather info dynamically.

🎨 Screenshots

(Add screenshots of your app here showing weather cards, AQI, and forecast.)
🎨 Screenshots

💡 Notes
The app fetches data from RapidAPI; a stable internet connection is required.

AQI values are categorized as:

1 – Good ✅

2 – Fair ⚖️

3 – Moderate ⚠️

4 – Poor ❌

5 – Very Poor 🚫

📜 License

MIT License © 2025

