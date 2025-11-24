// ------------------------
// Config - RapidAPI Keys
// ------------------------
const weatherApiKey = 'a43e06d5acmsh1bcadcb38ec9c22p14a70fjsn3ea6a53c2722';
const weatherApiHost = 'weather-api167.p.rapidapi.com';

const aqiApiKey = 'a43e06d5acmsh1bcadcb38ec9c22p14a70fjsn3ea6a53c2722';
const aqiApiHost = 'air-quality.p.rapidapi.com';

// ------------------------
// DOM Elements
// ------------------------
const checkBtn = document.getElementById('checkBtn');
const cityInput = document.getElementById('cityInput');

const resultsDiv = document.getElementById('results');
const cityNameEl = document.getElementById('cityName');
const dateTimeEl = document.getElementById('dateTime');
const weatherInfoEl = document.getElementById('weatherInfo');
const extraInfoEl = document.getElementById('extraInfo');
const weatherIconEl = document.getElementById('weatherIcon');

const airQualityInfoEl = document.getElementById('airQualityInfo');
const aqiAdviceEl = document.getElementById('aqiAdvice');

const hourlyForecastEl = document.getElementById('hourlyForecast');
const forecastListEl = document.getElementById('forecastList');
const tipsListEl = document.getElementById('tipsList');

// ------------------------
// Event Listener
// ------------------------
checkBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return alert('Please enter a city name.');

    try {
        // ------------------------
        // 1️⃣ Fetch Weather Data
        // ------------------------
        const weatherUrl = `https://${weatherApiHost}/current?city=${city}`;
        const weatherRes = await fetch(weatherUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': weatherApiKey,
                'x-rapidapi-host': weatherApiHost,
                'Accept': 'application/json'
            }
        });
        const weatherData = await weatherRes.json();

        if (!weatherData || !weatherData.location) throw new Error('City not found');

        // Update Current Weather
        cityNameEl.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
        dateTimeEl.textContent = weatherData.location.localtime;
        weatherInfoEl.textContent = `🌡️ ${weatherData.current.temp_c}°C / ${weatherData.current.temp_f}°F | ${weatherData.current.condition.text}`;
        extraInfoEl.textContent = `💧 Humidity: ${weatherData.current.humidity}% | 🌬️ Wind: ${weatherData.current.wind_dir} ${weatherData.current.wind_degree}°`;
        weatherIconEl.src = 'https:' + weatherData.current.condition.icon;
        weatherIconEl.alt = weatherData.current.condition.text;

        const lat = weatherData.location.lat;
        const lon = weatherData.location.lon;

        // ------------------------
        // 2️⃣ Fetch AQI Data
        // ------------------------
        const aqiUrl = `https://${aqiApiHost}/current/airquality?lat=${lat}&lon=${lon}`;
        const aqiRes = await fetch(aqiUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': aqiApiKey,
                'x-rapidapi-host': aqiApiHost
            }
        });
        const aqiData = await aqiRes.json();

        const aqi = aqiData.current['us-epa-index'] || 1;
        let aqiText = '', adviceText = '';
        switch(aqi){
            case 1: aqiText='Good'; adviceText='Air quality is safe. Enjoy your day!'; break;
            case 2: aqiText='Fair'; adviceText='Air quality is acceptable.'; break;
            case 3: aqiText='Moderate'; adviceText='Sensitive groups should limit outdoor activity.'; break;
            case 4: aqiText='Poor'; adviceText='Limit outdoor exposure and wear a mask.'; break;
            case 5: aqiText='Very Poor'; adviceText='Avoid outdoor activity. Air quality is hazardous!'; break;
            default: aqiText='Unknown'; adviceText='Air quality data unavailable.';
        }
        airQualityInfoEl.innerHTML = `AQI: <span class="aqi-${aqiText.toLowerCase().replace(' ','-')}">${aqiText}</span> (${aqi})`;
        aqiAdviceEl.textContent = adviceText;

        // ------------------------
        // 3️⃣ Hourly Forecast (Tomorrow)
        // ------------------------
        hourlyForecastEl.innerHTML = '';
        if (weatherData.forecast && weatherData.forecast.forecastday) {
            const tomorrowForecast = weatherData.forecast.forecastday[1]; // tomorrow
            tomorrowForecast.hour.forEach(h => {
                const div = document.createElement('div');
                div.classList.add('forecast-card-hour');
                div.innerHTML = `${h.time.split(' ')[1]} - 🌡️ ${h.temp_c}°C | ${h.condition.text}`;
                hourlyForecastEl.appendChild(div);
            });
        }

        // ------------------------
        // 4️⃣ 3-Day Forecast
        // ------------------------
        forecastListEl.innerHTML = '';
        if (weatherData.forecast && weatherData.forecast.forecastday) {
            weatherData.forecast.forecastday.slice(0,3).forEach(day => {
                const div = document.createElement('div');
                div.classList.add('forecast-card-day');
                div.innerHTML = `${day.date} - 🌡️ ${day.day.avgtemp_c}°C / ${day.day.avgtemp_f}°F | ${day.day.condition.text}`;
                forecastListEl.appendChild(div);
            });
        }

        // ------------------------
        // 5️⃣ Tips Section (dynamic)
        // ------------------------
        tipsListEl.innerHTML = `
            <li>Stay hydrated 💧</li>
            <li>Wear a mask 😷 if AQI is poor or very poor</li>
            <li>Limit outdoor activity 🌳 on high pollution days</li>
            <li>Monitor symptoms if sensitive ⚠️</li>
        `;

        // ------------------------
        // Show Results
        // ------------------------
        resultsDiv.classList.remove('hidden');

    } catch (err) {
        console.error(err);
        alert('Error fetching data. Please check the city name or try again later.');
    }
});

