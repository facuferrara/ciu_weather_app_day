
// let appi = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&
// exclude={part}&appid={f4e5376ae030d3550540f10ea81ad49b};


var contenidoATraer = document.querySelector('#contenido')

function traer(){
  fetch('textoClima.txt')
  .then(respuesta => respuesta.json())
  .then(data=> console.log(data))
  
}