// Year and Last Modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Wind Chill function (ONE line)
function calculateWindChill(t, s) {
  return 13.12 + (0.6215 * t) - (11.37 * Math.pow(s, 0.16)) + (0.3965 * t * Math.pow(s, 0.16));
}

// Check conditions and calculate
const temp = parseFloat(document.getElementById("temp").textContent);
const windSpeed = parseFloat(document.getElementById("windSpeed").textContent);
const windChillSpan = document.getElementById("windChill");

if (temp <= 10 && windSpeed > 4.8) {
  windChillSpan.textContent = calculateWindChill(temp, windSpeed).toFixed(1) + " °C";
} else {
  windChillSpan.textContent = "N/A";
}
