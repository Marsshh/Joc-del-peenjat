// Definició de variables
var palabraSecreta = "";
var palabraAdivinada = "";
var intentosMaximos = 6;
var intentosFallados = 0;
var letrasFalladas = [];
var partidasJugadas = 0;
var partidasGanadas = 0;
var partidasPerdidas = 0;
//funcio per reiniciar estadistiques
function reiniciarestadisticas() {
  intentosFallados = 0;
  letrasFalladas = [];
  partidasJugadas = 0;
  partidasGanadas = 0;
  partidasPerdidas = 0;

  alert("Les estadístiques han estat reiniciades");
}

function bloquearBoton(letra) {
  var botones = document.querySelectorAll("button");
  botones.forEach(function (button) {
    if (button.innerHTML === letra) {
        //desactivar botó + canviar css color del mateix
      button.disabled = true;
      button.classList.add("usado");
    }
  });
}

// Funció per mostrar estadístiques
function mostrarEstadisticas() {
  var estadisticas = "Total de partides: " + partidasJugadas + "\n";
  estadisticas +=
    "Partides guanyades (" +
    ((partidasGanadas / partidasJugadas) * 100).toFixed(2) +
    "%): " +
    partidasGanadas +
    "\n";
  estadisticas +=
    "Partides perdudes (" +
    ((partidasPerdidas / partidasJugadas) * 100).toFixed(2) +
    "%): " +
    partidasPerdidas;

  var nuevaVentana = window.open("", "_blank", "width=400, height=300");
  nuevaVentana.document.write("<pre>" + estadisticas + "</pre>");
  nuevaVentana.document.close();
}

// Funció principal
function IniciarPartida() {
  var botonesUsados = document.querySelectorAll(".usado");
  botonesUsados.forEach(function (button) {
    button.disabled = false;
    button.classList.remove("usado");
  });
  //reiniciar valors de les variables al començar una nova partida
  letrasFalladas = [];
  intentosFallados = 0;
  palabraSecreta = prompt("Introdueix una paraula secreta:").toLowerCase();
  palabraAdivinada = "_".repeat(palabraSecreta.length);
  adivinarLetra();
}

function sortir() {
  alert("Fins aviat!");
}

function adivinarLetra(letra) {
  var imatgePenjat = document.getElementById("imatgePenjat");
    //funcio per trobar les lletres de la paraula
  if (palabraSecreta.includes(letra)) {
    for (var i = 0; i < palabraSecreta.length; i++) {
      if (palabraSecreta[i] === letra) {
        palabraAdivinada = reemplazarLetra(palabraAdivinada, i, letra);
      }
    }
  } else {
    //si es falla la lletra es posa la imatge de l'estat del penjat i es suma un intent
    letrasFalladas.push(letra);
    imatgePenjat.src = "penjat_" + intentosFallados + ".png";
    intentosFallados++;
  }
  bloquearBoton(letra);
  mostrarProgreso();
}

// Funció para canviar lletra
function reemplazarLetra(cadena, indice, letra) {
  return cadena.substr(0, indice) + letra + cadena.substr(indice + 1);
}

// Función para comprobar si el carácter es una letra
function esLetra(caracter) {
  return /^[a-z]$/.test(caracter);
}

// Funció per mostrar el progres o si s'ha acabat el joc
function mostrarProgreso() {
  var jocPenjat = document.getElementById("jocPenjat");
  jocPenjat.innerHTML = "Paraula: " + palabraAdivinada + "<br>";
  jocPenjat.innerHTML +=
    "Lletres fallades " +
    (intentosFallados - 1) +
    "/" +
    intentosMaximos +
    ": " +
    letrasFalladas.join(", ") +
    "<br>";

  if (palabraAdivinada === palabraSecreta) {
    jocPenjat.innerHTML +=
      "Felicitats! Has encertat la paraula: " + palabraSecreta + "<br>";
    partidasGanadas++;
    partidasJugadas++;
  } else if (intentosFallados - 1 === intentosMaximos) {
    jocPenjat.innerHTML +=
      "Has mort penjat. La paraula era: " + palabraSecreta + "<br>";
    partidasPerdidas++;
    partidasJugadas++;
  }
}

// Funció per mostrar el teclat
function mostrarAbecedario() {
  var abecedario = "abcdefghijklmnopqrstuvwxyz"; // Caracteres permitidos
  var abecedarioHTML = "";

  for (var i = 0; i < abecedario.length; i++) {
    var letra = abecedario[i];
    abecedarioHTML +=
      "<button onclick=\"adivinarLetra('" +
      letra +
      '\')" class="usado">' +
      letra +
      "</button>";
  }

  document.getElementById("abecedari").innerHTML = abecedarioHTML;
}

// Llamada a la función para mostrar el abecedario
mostrarAbecedario();
