// Dynamic Footer
document.querySelector('footer').innerHTML = `
  &copy;${new Date().getFullYear()} Edwin Kambale | Uganda 
  Last Modified: ${document.lastModified}
`;

// Wind Chill Calculator (Metric)
const calculateWindChill = (temp, windSpeed) => 
  (temp <= 10 && windSpeed > 4.8) 
    ? (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1) + "°C" 
    : "N/A";

// Static Values
document.getElementById('windchill').textContent = calculateWindChill(10, 5);
