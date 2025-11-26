🌤️ Air Quality & Weather Tracker

A real-time weather and air quality tracking web application. Enter any city to get the current weather, 3-hour forecasts, 3-day forecasts, and a 72-hour air quality index (AQI).

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

Getting Started
git clone <your-repo-url>
cd <your-repo-folder>

Install dependencies
npm install

Run the server
node server.js

📂 Project Structure
Airquality-weather-Tracker
public/
 ├── index.html       # Frontend HTML
 ├── style.css        # CSS styles
 └── script.js        # Client-side JavaScript
server.js             # Node.js + Express backend
.env                  # Environment variables for API keys
README.md             # Project documentation

Usage
Open the web app in your browser.
This is the structure of how this app looks like 
Type a city name in the search box.
Click Check to fetch:
Current weather

Hourly forecast

3-day forecast

AQI for the next 72 hours
View color-coded AQI advice and dynamic weather info.

Here is the  Demo video that shows how this app function from the beginning to the end
https://youtu.be/RmKlW0TG_Jg


🌐 Deployment & Load Balancer
This app is deployed on two web servers and one load balancer (HAProxy) for scalability and reliability.

1. Web Servers Setup (Web01 & Web02)

SSH into each server:
ssh ubuntu@<server-ip>

Install Node.js and dependencies:
sudo apt update
sudo apt install -y nodejs npm build-essential python3
cd ~/AirQuality-Weather-Tracker
npm install

Run the application with PM2:
pm2 start server.js --name weather-app
pm2 save

Verify the app is running:

curl -I http://localhost:5500

2. Load Balancer Setup (Lb01)
SSH into the load balancer:
ssh ubuntu@<load-balancer-ip>

Install HAProxy:
sudo apt update
sudo apt install -y haproxy

Edit the HAProxy configuration /etc/haproxy/haproxy.cfg:
global
    log /dev/log local0
    log /dev/log local1 notice
    daemon

defaults
    log     global
    mode    http
    timeout connect 5000ms
    timeout client 50000ms
    timeout server 50000ms

frontend http_front
    bind *:80
    default_backend http_back

backend http_back
    balance roundrobin
    server web1 <Web01-IP>:5500 check
    server web2 <Web02-IP>:5500 check
    
Restart HAProxy:
sudo systemctl restart haproxy
sudo systemctl status haproxy

Test Load Balancer:
curl -I http://<load-balancer-ip>

3. Security & Firewall
sudo ufw allow 5500/tcp
sudo ufw status

💡 Notes

The app fetches data from RapidAPI; a stable internet connection is required.

AQI values are categorized as:

Good ✅

Fair ⚖️

Moderate ⚠️

Poor ❌

Very Poor 🚫

📜 License

MIT License © 2025

About the Developer

Nyayath Lual Deng Chol is a passionate software engineering student and aspiring tech innovator from South Sudan. she is driven by a mission to create practical and scalable technological solutions that address real-world challenges,in the community development.

Nyayath is skilled in Node.js, Python, and frontend development, and is committed to building impactful projects that combine innovation with social good.
