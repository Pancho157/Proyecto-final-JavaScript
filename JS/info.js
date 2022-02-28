let mapButtons = document.querySelectorAll(".map_point");
let navigation_items = document.querySelectorAll(".navigation__item");
const infoSection = document.getElementById("info");
let currentStage = localStorage.getItem("stage");
let stageToUnlock = localStorage.getItem("stageToUnlock");

// Verifica que existan en local storage las las variables "currentStage, stageToUnlock y gameWon" y las genera en caso de no existir
if (currentStage == undefined) {
  let currentStage = 0;
  localStorage.setItem("stage", currentStage);
}

if (stageToUnlock == undefined) {
  let stageToUnlock = 0;
  localStorage.setItem("stageToUnlock", currentStage);
}

for (let i = 0; i < mapButtons.length; i++) {
  // Verifica cuando se presiona uno de los botones del mapa
  mapButtons[i].onclick = function () {
    // Verifica que el stage se encuentre desbloqueado al mirar las clases del html
    if (
      mapButtons[i].classList.contains("played") ||
      mapButtons[i].classList.contains("toPlay")
    ) {
      // Saca la clase "activo" de los diferentes navigation__item
      let j = 0;
      while (j < mapButtons.length) {
        navigation_items[j++].className = "navigation__item";
      }

      // Coloca la clase activo al contenido correspondiente al boton
      navigation_items[i].className =
        "navigation__item navigation__item--active";

      // Saca la clase hide a la sección de información
      infoSection.classList.remove("hide");

      // Genera/sobreescribe el indicador en localStorage para que los otros archivos JS identifiquen la información de que escenario mostrar
      localStorage.setItem("stage", i);

      // Con el código de debajo verifiqué que cambie el valor dependiendo del botón presionado
      // var prueba = localStorage.getItem("stage");
      // console.log(prueba)
    } else {
      alert("Usted no ha desbloqueado este desafío aún");
    }

    if (mapButtons[i].classList.contains("toPlay")) {
      localStorage.setItem("stageToUnlock", i);
    }
  };
}

function actualization() {
  //Elimina las clases "played" y "toPlay" de los elementos que las poseen y se las coloca a los correspondientes a los escenarios desbloqueados hasta el momento
  for (i = 0; i < (mapButtons.length); i++) {
    if (i < stageToUnlock) {
      if (mapButtons[i].classList.contains("played")) {
        mapButtons[i].classList.remove("played");
      }
      if (mapButtons[i].classList.contains("toPlay")) {
        mapButtons[i].classList.remove("toPlay");
      }
      mapButtons[i].classList.add("played");
    } else if (i == stageToUnlock) {
      if (mapButtons[i].classList.contains("played")) {
        mapButtons[i].classList.remove("played");
      }
      if (mapButtons[i].classList.contains("toPlay")) {
        mapButtons[i].classList.remove("toPlay");
      }
      mapButtons[i].classList.add("toPlay");
    } else {
      if (mapButtons[i].classList.contains("played")) {
        mapButtons[i].classList.remove("played");
      }
      if (mapButtons[i].classList.contains("toPlay")) {
        mapButtons[i].classList.remove("toPlay");
      }
    }
  }
}

if ((currentStage - 1) == stageToUnlock) {
  // Cuando uno completa un desafío la variable currentStage aumenta en uno
  // Verifico que el stage actual sea mayor al stage a desbloquear debido a que el actual sería más alto que el stage a desbloquear cuando se juegue el stage a desbloquear
  stageToUnlock = currentStage;
  localStorage.setItem("stageToUnlock", stageToUnlock);
  actualization();
}