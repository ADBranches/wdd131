// ===== WEATHER MODULE ===== //
const weatherData = {
  temperature: 8,      // Static value (replace with API later)
  condition: "cloudy",  // "sunny", "rainy", or "cloudy"
  windSpeed: 10,        // km/h
};

// Icon Configuration
const weatherIcons = {
  sunny: {
    mobile: "images/weather-sunny.svg",
    desktop: "images/weather-sunny.svg"
  },
  cloudy: {
    mobile: "images/weather-cloudy.svg",
    desktop: "images/weather-cloudy.svg"  
  },
  rainy: {
    mobile: "images/weather-rainy.svg",
    desktop: "images/weather-rainy.svg"
  }
};

// Wind Chill Calculator (Metric)
function calculateWindChill(temp, windSpeed) {
  return (temp <= 10 && windSpeed > 4.8) 
    ? (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1) + "°C" 
    : "N/A";
}

// Update Weather Display
function renderWeather() {
  const currentCondition = weatherData.condition;
  
  // Set icons for both mobile and desktop
  document.documentElement.style.setProperty(
    '--icon-weather', 
    `url('${weatherIcons[currentCondition].desktop}')`
  );
  
  document.getElementById("dynamicWeatherIcon").style.backgroundImage = 
    `url('${weatherIcons[currentCondition].mobile}')`;
  
  // Update weather data
  document.getElementById("weather-temp").textContent = `${weatherData.temperature}°C`;
  document.getElementById("weather-cond").textContent = currentCondition;
  document.getElementById("weather-wind").textContent = `${weatherData.windSpeed} km/h`;
  document.getElementById("weather-chill").textContent = 
    calculateWindChill(weatherData.temperature, weatherData.windSpeed);
}

// ===== FOOTER ===== //
document.querySelector("footer").innerHTML = `
  ©${new Date().getFullYear()} Edwin Kambale Uganda 
  Last Modified: ${document.lastModified}
`;

// Initialize
renderWeather();