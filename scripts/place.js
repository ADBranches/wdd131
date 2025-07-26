const weatherData = {
  temperature: 8,     
  condition: "cloudy", 
  windSpeed: 10        
};

const weatherIcons = {
  sunny: "☀️",    
  cloudy: "⛅",  
  rainy: "🌧️"    
};

// Wind Chill Calculator
function calculateWindChill(temp, windSpeed) {
  return (temp <= 10 && windSpeed > 4.8) ? 
    (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 
    0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1) + "°C" : "N/A";
}

// Updating Weather Display 
function renderWeather() {
  const currentCondition = weatherData.condition;
  const iconElement = document.getElementById("dynamicWeatherIcon");
  
  // Mobile: Update SVG icon
  iconElement.className = `weather-icon ${currentCondition}`;
  
  // Desktop: Update emoticon
  const emoticons = { sunny: "☀️", cloudy: "⛅", rainy: "🌧️" };
  document.querySelector('.weather h2').dataset.icon = emoticons[currentCondition];
  
  // Update weather data
  document.getElementById("weather-temp").textContent = `${weatherData.temperature}°C`;
  document.getElementById("weather-cond").textContent = currentCondition;
  document.getElementById("weather-wind").textContent = `${weatherData.windSpeed} km/h`;
  document.getElementById("weather-chill").textContent = 
  	calculateWindChill(weatherData.temperature, weatherData.windSpeed);
}

// ===== FOOTER ===== //
document.querySelector("footer").innerHTML = `
  ©${new Date().getFullYear()} Edwin Kambale | Uganda 
  Last Modified: ${document.lastModified}
`;

// Initializing
renderWeather();