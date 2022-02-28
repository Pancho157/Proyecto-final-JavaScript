let iconos = [];
let selecciones = [];
let todosCorrectos = true;
let contCorrectos = 0;
const botonMapa = document.getElementById("alMapa");
let temporizador = 0;

generarTablero();

// Exite para evitar que se puedan seleccionar figuras cuando las muestra para recordar sus posiciones
if (temporizador <= 4) {
  setInterval(() => {
    temporizador++;
  }, 1000);
}

function cargarIconos() {
  iconos = [
    '<i class="fas fa-star"></i>',
    '<i class="far fa-star"></i>',
    '<i class="fas fa-star-of-life"></i>',
    '<i class="fas fa-star-and-crescent"></i>',
    '<i class="fab fa-old-republic"></i>',
    '<i class="fab fa-galactic-republic"></i>',
    '<i class="fas fa-sun"></i>',
    '<i class="fas fa-stroopwafel"></i>',
    '<i class="fas fa-dice"></i>',
    '<i class="fas fa-chess-knight"></i>',
    '<i class="fas fa-chess"></i>',
    '<i class="fas fa-dice-d20"></i>',
  ];
}

function generarTablero() {
  cargarIconos();

  selecciones = [];
  let tablero = document.getElementById("tablero");
  let tarjetas = [];
  for (let i = 0; i < 24; i++) {
    tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                    <i class="far fa-question-circle"></i>
                </div>
            </div>
        </div>        
        `);
    if (i % 2 == 1) {
      // Hace que solo aparezcan dos de cada ícono, sinó todas las cards serían equivalentes a la primer imagen
      iconos.splice(0, 1);
    }
  }
  tarjetas.sort(() => Math.random() - 0.5);
  tablero.innerHTML = tarjetas.join(" ");
}

function seleccionarTarjeta(i) {
  // El temporizador sirve para evitar que se puedan seleccionar figuras cuando las muestra para recordar sus posiciones
  if (temporizador >= 4) {
    let tarjeta = document.getElementById("tarjeta" + i);
    if (tarjeta.style.transform != "rotateY(180deg)") {
      // Da vuelta las tarjetas que seleccionamos
      tarjeta.style.transform = "rotateY(180deg)";
      selecciones.push(i);
    }
    if (selecciones.length == 2) {
      deseleccionar(selecciones);
      selecciones = [];
    }
  }
}

function deseleccionar(selecciones) {
  setTimeout(() => {
    let trasera1 = document.getElementById("trasera" + selecciones[0]);
    let trasera2 = document.getElementById("trasera" + selecciones[1]);

    if (trasera1.innerHTML != trasera2.innerHTML) {
      // Verifica que las tarjetas cohincidan
      let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
      let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);

      // Muestra el lado trasero de las cards cuando dejan de estar seleccionadas
      tarjeta1.style.transform = "rotateY(0deg)";
      tarjeta2.style.transform = "rotateY(0deg)";
    } else {
      // Deja las tarjetas dadas vuelta en caso de ser correctas y cambia el color de fondo
      trasera1.style.background = "plum";
      trasera2.style.background = "plum";

      contCorrectos++;
      if (contCorrectos == 12) {
        // Verifica que todas las parejas se encuentren conectadas y muestra el botón para ir al mapa (aparte de actualizar el local storage)
        mapActualization();
        botonMapa.style.display = "block";
      }
    }
  }, 1000);
}

function mapActualization() {
  // Utiliza "stage" en local storage para indicar el desafío que se esta realizando
  // Cuando se gana lo que hace esta función es incrementar en uno dicha variable
  let currentStage = localStorage.getItem("stage");
  currentStage++;
  localStorage.setItem("stage", currentStage);
}
