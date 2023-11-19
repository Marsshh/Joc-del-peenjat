//definicio de variables
var palabraSecreta = "";
var palabraAdivinada = "";
var intentosMaximos = 6;
var intentosFallados = 0;
var letrasFalladas = [];
var partidasJugadas = 0;
var partidasGanadas = 0;
var partidasPerdidas = 0;

//funcio mostrar estadistiques 
function mostrarEstadisticas() {
    console.log("Total de partides: " + partidasJugadas);
    console.log("Partides guanyades (" + ((partidasGanadas / partidasJugadas) * 100).toFixed(2) + "%): " + partidasGanadas);
    console.log("Partides perdudes (" + ((partidasPerdidas / partidasJugadas) * 100).toFixed(2) + "%): " + partidasPerdidas);
    mostrarMenu();
}

//funcio principal 
function mostrarMenu() {
   
     
    var opcion = prompt("1. Iniciar un joc\n2. Mostra estadístiques\n3. Sortir");
   
//switchcase
    switch (opcion) {
        case "1":
            intentosFallados = 0
            palabraSecreta = prompt("Introdueix una paraula secreta:").toLowerCase();
            //emplenar de barra baixa la paraula
            palabraAdivinada = "_".repeat(palabraSecreta.length);
            //crida la funcio
            adivinarLetra();
            break;
        case "2":
            mostrarEstadisticas();
            break;
        case "3":
            alert("Fins aviat!");
            break;
        
        
    }
}

function adivinarLetra() {
    var letra = prompt("Introdueix una lletra:").toLowerCase();
//comprovació que sigui lletra valida i un sol caractes
    if (letra.length !== 1 || !esLetra(letra)) {
        console.log("Error: Introdueix una sola lletra vàlida.");
        adivinarLetra();
        return;
    }

    if (palabraSecreta.includes(letra)) {
        //bucle per a comprovar si la paraula conté la lletra dle usuari i en quina posicio
        for (var i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
                //cridar funcio que remplaça la lletra a la posicio adecuada
                palabraAdivinada = reemplazarLetra(palabraAdivinada, i, letra);
            }
        }
    } else {
        //agregar al array de lletres fallades la lletra i sumar intent
        letrasFalladas.push(letra);
        intentosFallados++;
    }
//mostrar el progres de lletres fallades
    mostrarProgreso();
//si el usuari segueix viu segueix mostrant el input de lletra
    if (palabraAdivinada !== palabraSecreta && intentosFallados < intentosMaximos) {
        adivinarLetra();
    }
}
//remplaçar lletra
function reemplazarLetra(cadena, indice, letra) {
    return cadena.substr(0, indice) + letra + cadena.substr(indice + 1);
}
//funcio per comprovar si el caractes es una lletra
function esLetra(caracter) {
    return /^[a-z]$/.test(caracter);
}
//funcio per mostrar el progres o si ha acabat el joc
function mostrarProgreso() {
    console.log("Paraula: " + palabraAdivinada);
    console.log("Lletres fallades " + intentosFallados + "/" + intentosMaximos + ": " + letrasFalladas.join(", "));

    if (palabraAdivinada === palabraSecreta) {
        console.log("Felicitats! Has encertat la paraula: " + palabraSecreta);
        partidasGanadas++;
        partidasJugadas++;
        mostrarMenu();

    } else if (intentosFallados === intentosMaximos) {
        console.log("Has mort penjat. La paraula era: " + palabraSecreta);
        partidasPerdidas++;
        partidasJugadas++;
        mostrarMenu();
       
    }
}
mostrarMenu()











