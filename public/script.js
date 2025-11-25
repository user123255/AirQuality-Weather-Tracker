
const openWeatherMapKey = "32f84115caef271185d82587f835ec9a";
const someOtherApiKey = "c038e0723dmsh1eb1499381041fdp16f666jsn7da1db80331e";

// DOM elements
const checkBtn = document.getElementById("checkBtn");
const cityInput = document.getElementById("city");
const cityName = document.getElementById("cityName");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");
const extraEl = document.getElementById("extra");
const weatherIcon = document.getElementById("weatherIcon");
const aqiValue = document.getElementById("aqiValue");
const aqiStatus = document.getElementById("aqiStatus");
const aqiDesc = document.getElementById("aqiDesc");
const hourlyDiv = document.getElementById("hourly");
const forecastDiv = document.getElementById("forecast");
const tipsEl = document.getElementById("tips");
const resultsSection = document.getElementById("results");
const loader = document.getElementById("loader");
const recentList = document.getElementById("recentList");

// Possible weather conditions and emojis
const weatherConditions = [
  { weather: "Sunny", description: "Clear sky", emoji: "☀️" },
  { weather: "Cloudy", description: "Partly cloudy", emoji: "⛅" },
  { weather: "Rainy", description: "Light rain", emoji: "🌧️" },
  { weather: "Stormy", description: "Thunderstorms", emoji: "⛈️" },
  { weather: "Snowy", description: "Snow showers", emoji: "❄️" },
  { weather: "Windy", description: "Strong winds", emoji: "🌬️" }
];

// AQI ranges
const aqiLevels = [
  { max: 50, status: "Good", desc: "Air quality is satisfactory." },
  { max: 100, status: "Moderate", desc: "Air quality is acceptable." },
  { max: 150, status: "Unhealthy for Sensitive Groups", desc: "Some health effects may be present." },
  { max: 200, status: "Unhealthy", desc: "Everyone may experience health effects." },
  { max: 300, status: "Very Unhealthy", desc: "Health alert: everyone may be affected." },
  { max: 500, status: "Hazardous", desc: "Health warnings of emergency conditions." }
];

// Tips
const tipsList = [
  "Carry an umbrella just in case!",
  "Wear sunscreen on sunny days.",
  "Stay hydrated and avoid long exposure to wind.",
  "Wear a coat or jacket during snow or cold weather.",
  "Avoid outdoor exercise if AQI is unhealthy.",
  "Check hourly updates for sudden weather changes."
];

// Recent cities
let recentCities = [];

// Event listener
checkBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  generateWeather(city);
});

// Generate random weather for a city
function generateWeather(city) {
  loader.classList.remove("hidden");
  resultsSection.classList.add("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");
    resultsSection.classList.remove("hidden");

    // Weather
    const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const temp = (Math.random() * 35 + 5).toFixed(1); // 5°C to 40°C
    const humidity = Math.floor(Math.random() * 61) + 30; // 30% - 90%
    const wind = (Math.random() * 10).toFixed(1); // 0 - 10 m/s

    cityName.textContent = city;
    tempEl.textContent = `${temp}°C`;
    conditionEl.textContent = condition.weather + " - " + condition.description;
    extraEl.textContent = `Humidity: ${humidity}% | Wind: ${wind} m/s`;
    weatherIcon.textContent = condition.emoji;

    // AQI
    const aqi = Math.floor(Math.random() * 501); // 0-500
    const aqiLevel = aqiLevels.find(level => aqi <= level.max);
    aqiValue.textContent = aqi;
    aqiStatus.textContent = aqiLevel.status;
    aqiDesc.textContent = aqiLevel.desc;

    // Hourly forecast (next 12 hours)
    hourlyDiv.innerHTML = "";
    for (let i = 1; i <= 12; i++) {
      const hourTemp = (Math.random() * 35 + 5).toFixed(1);
      const hourCond = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      const div = document.createElement("div");
      div.classList.add("hour-card");
      div.innerHTML = `<strong>${i}h</strong><br>${hourTemp}°C ${hourCond.emoji}`;
      hourlyDiv.appendChild(div);
    }

    // 3-day forecast
    forecastDiv.innerHTML = "";
    for (let i = 1; i <= 3; i++) {
      const dayTemp = (Math.random() * 35 + 5).toFixed(1);
      const dayCond = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      const div = document.createElement("div");
      div.classList.add("day-card");
      div.innerHTML = `<strong>Day ${i}</strong><br>${dayTemp}°C ${dayCond.emoji}`;
      forecastDiv.appendChild(div);
    }

    // Tips
    tipsEl.textContent = tipsList[Math.floor(Math.random() * tipsList.length)];

    // Recent cities
    if (!recentCities.includes(city)) {
      recentCities.unshift(city);
      if (recentCities.length > 5) recentCities.pop();
      updateRecentCities();
    }

  }, 800); // loading delay
}

// Update recent city list
function updateRecentCities() {
  recentList.innerHTML = "";
  recentCities.forEach(c => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "small");
    btn.textContent = c;
    btn.addEventListener("click", () => generateWeather(c));
    recentList.appendChild(btn);
  });
}

