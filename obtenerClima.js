//-->> Elementos necesarios <<-- 

var lat = -34.5708;
var lon = -58.6243;
var apiKey = "a1e912ecb9c1a802a68536ed3581a6f3";
var unit = "metric";
var lang = "es";
var part = "";
const request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&exclude=${part}&appid=${apiKey}`;

function obtenerElClimaActual() {  

  return fetch(request)
    .then(response => response.json()) //Consumiendo  API.
    .then(informacionActual => {        
      var datoActual = new Date() 
      //Hora
      document.getElementById("date").innerHTML =  datoActual.toString().substr(0,21);
    
      //Temperaturas (actuales-current)
        const temperaturaActual = parseInt(informacionActual.current.temp);        
        document.getElementById("temperatura").innerHTML = temperaturaActual;

      //Min y max
        document.getElementById("tempMax").innerHTML = `${parseInt(informacionActual.daily[0].temp.max)}°C↑`;
        document.getElementById("tempMin").innerHTML = `${parseInt(informacionActual.daily[0].temp.min)}°C↓`;

      // Iconos  
        const icono = informacionActual.current.weather[0].icon;
        const url = ` https://openweathermap.org/img/wn/${icono}@4x.png`;
        document.getElementById("sunnyImg").innerHTML = `<img src=${url}>`;
        document.getElementById("sunnyText").innerHTML = informacionActual.current.weather[0].main; 

      //humedad
      document.getElementById("humidityText1").innerHTML =  `${informacionActual.daily[0].humidity}%`;
      
      //Presion (pressure)
      document.getElementById("textPressure").innerHTML = `${parseInt(informacionActual.daily[0].pressure)}mBar`;

      //Vientos (wind)
      document.getElementById("textWind").innerHTML = `${parseInt(informacionActual.daily[0].wind_speed)}km/h`;

      //Amanecer (Mañana-Sunrise)
      const sunriseActual = new Date(informacionActual.daily[0].sunrise);
      document.getElementById("sunriseHs").innerHTML = `${sunriseActual.getHours()}:${sunriseActual.getMinutes()}`;

      //Puesta de sol (Mediodia-Sunset) se actualiza cada dia (daily)
      const sunsetActual = new Date(informacionActual.daily[0].sunset * 1000);
      document.getElementById("sunsetHs").innerHTML = `${sunsetActual.getHours()}:${sunsetActual.getMinutes()}`;
      
      
      //Tiempo del dia (Duracion-Daytime) se actualiza cada hora(hourly)
      const daytimeActual= new Date(informacionActual.hourly[0].dt * 1000);
      document.getElementById("dayTimeHs").innerHTML = `${daytimeActual.getHours()}`;



      //Siguientes dias 
        const mañana = new Date(datoActual);
          for ( i = 1; i <= 4; i ++) { 
            //siempre son 4 dias, entonces el recorrido se ejecuta
              const icon = informacionActual.daily[index].weather[0].icon; //traigo los iconos
              const url = ` https://openweathermap.org/img/wn/${icon}@2x.png`; 
              
              document.getElementById(`sunnyImg${i}`).innerHTML = `<img src=${url}>`;
              document.getElementById(`tempMax${i}`).innerHTML = `${parseInt(informacionActual.daily[i].temp.max)}°C↑`;
              document.getElementById(`tempMin${i}`).innerHTML = `${parseInt(informacionActual.daily[i].temp.min)}°C↓`;
              
              mañana.setDate(datoActual.getDate() + i);
              document.getElementById(`currentHour${i}`).innerHTML = `
                
              ${mañana.toString().substr(0,3)}, 
              ${mañana.toString().substr(7,3)}`
        }

      return informacionActual.daily[0] //Devuelve dia actual.

  }) 
  .catch(err => { console.log(err) })
}
obtenerElClimaActual();