// server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// -----------------------------------------------
//  WEATHER + AQI DATA (mocked for offline / testing)
// -----------------------------------------------
app.get("/weather", (req, res) => {
  const city = req.query.city || "Test City";
  return res.json({
    city,
    current: {
      temp: 26,
      weather: [{ description: "sunny", icon: "01d" }],
      humidity: 60,
      wind_speed: 2.5,
    },
    hourly: [
      { time: "09:00", temp: 24 },
      { time: "12:00", temp: 27 },
      { time: "15:00", temp: 29 },
      { time: "18:00", temp: 25 },
    ],
    forecast: [
      { day: "Tomorrow", temp: 27, condition: "rainy" },
      { day: "Day 2", temp: 28, condition: "cloudy" },
      { day: "Day 3", temp: 29, condition: "sunny" },
    ],
    aqi: { index: 42, category: "Good", description: "Air is safe" },
  });
});

// -------------------------------------------------------------
// API references (kept for future use)
// -------------------------------------------------------------
const API_REFERENCE = {
  geocoding: "http://api.openweathermap.org/geo/1.0/direct",
  current: "https://api.openweathermap.org/data/2.5/weather",
  forecast: "https://api.openweathermap.org/data/2.5/forecast",
  air: "https://api.openweathermap.org/data/2.5/air_pollution",
  key: "32f84115caef271185d82587f835ec9a",
};

// Serve index.html for all other routes (SPA support)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server on port 5500
const PORT = process.env.PORT || 5500;
app.listen(PORT, () =>
  console.log(`🔥 Weather Server live at http://localhost:${PORT}`)
);

