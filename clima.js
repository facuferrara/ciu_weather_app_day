var apiKey = a1e912ecb9c1a802a68536ed3581a6f3;
var lat = -34.5708;
var lon = -58.6243;
var unit = "metric";
var lang = "es";
var part = "";
var weeklyReport = [];

var hora = document.getElementById("date");
var ciudad = document.getElementById("location");
const request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&exclude=${part}&appid=${apiKey}`;

function obtenerElClimaActual() {  

  return fetch(request).then(response => response.json()) //Le pega a la API.
    .then(informacionActual => {        
      var datoActual = new Date() 
  
      //Hora
      document.getElementById("date").innerHTML =  datoActual.toString().substr(0,21);
    
      //Ciudad
      document.getElementById("location").innerHTML = " Villa Tesei "; 

      // Iconos  
        const icon = informacionActual.current.weather[0].icon;
        const url = ` https://openweathermap.org/img/wn/${icon}@4x.png`;
        document.getElementById("weatherIcon").innerHTML = `<img src=${url}>`;
        document.getElementById("weatherTittle").innerHTML = informacionActual.current.weather[0].main;

      //Temperaturas
        const temperaturaActual = parseInt(informacionActual.current.temp);        
        document.getElementById("temperatura").innerHTML = temperaturaActual;

      //Min & max
        document.getElementById("max").innerHTML = `${parseInt(informacionActual.daily[0].temp.max)}°C↑`;
        document.getElementById("min").innerHTML = `${parseInt(informacionActual.daily[0].temp.min)}°C↓`;

      //Siguientes dias 
        const tomorrow = new Date(today);
        for ( i = 1; i <= 4; i ++) {
            const icon = informacionActual.daily[i].weather[0].icon;
            const url = ` https://openweathermap.org/img/wn/${icon}@2x.png`;
            document.getElementById(`weatherIcon${i}`).innerHTML = `<img src=${url}>`;
            document.getElementById(`max${i}`).innerHTML = `${parseInt(informacionActual.daily[i].temp.max)}°C↑`;
            document.getElementById(`min${i}`).innerHTML = `${parseInt(informacionActual.daily[i].temp.min)}°C↓`;
            tomorrow.setDate(today.getDate() + i);
            document.getElementById(`currentHour${i}`).innerHTML = `
                ${tomorrow.toString().substr(0,3)}, ${tomorrow.toString().substr(7,3)}`
        }

      return informacionActual.daily[0] //Devuelve dia actual.

  })
  .catch(err => { err = new Error(), console.log(err) })
}


function escribirTiempoActual() {
  getCurrentWeather()
  .then( day => {

      //Humedad (humidicity)
      document.getElementById("humidityText1").innerHTML = `${day.humidity}%`;

      //Presion (pressure)
      document.getElementById("textPressure").innerHTML = `${day.pressure}mBar`;

      //Vientos (wind)
      document.getElementById("textWind").innerHTML = `${parseInt(day.wind_speed)}km/h`;

      //Puesta de sol (Mediodia-Sunset)
      const currentSunset = new Date(day.sunset * 1000);
      document.getElementById("sunsetHs").innerHTML = `${currentSunset.getHours()}:${currentSunset.getMinutes()}`;
      
      //Amanecer (Mañana-Sunrise)
      const currentSunrise = new Date(day.sunrise * 1000);
      document.getElementById("sunriseHs").innerHTML = `${currentSunrise.getHours()}:${currentSunrise.getMinutes()}`;
      
      //Tiempo del dia (Duracion-Daytime)
      const currentDaytime= new Date(day.dt * 1000);
      document.getElementById("dayTimeHs").innerHTML = `${currentDaytime.getHours()}`;
  })
}

escribirTiempoActual() 