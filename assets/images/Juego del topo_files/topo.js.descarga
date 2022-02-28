var puntos = 0;

//* En caso de querer hacer pruebas se pueden bajar los puntos para victoria
var puntosVictoria = 10;

// Muestra los puntos necesarios para ganar
$("#meta").html(puntosVictoria);

$(function () {
  // Verifica que nos encontremos sobre un contenedor de topo y hayamos hecho click sobre algún topo
  $(".items").hover(function () {
    var tis = $(this);
    tis.find(".hueco").mousedown(function () {
      if (tis.hasClass("active")) {
        // Saca la clase activo si le dimos al topo y suma un punto
        tis.removeClass("active");
        puntos++;
        $("#puntos").html(puntos);
        if (puntos >= puntosVictoria) {
          mapActualization();
          $("#alMapa").css("display", "block");
        };
      };
    });
  });
});
var iterval = setInterval(function () {
  // Llama a la función que genera los topos de manera periodica
  topoaleatorio();
}, 1000);

topoaleatorio = function () {
  // Elimina los topos y utiliza un número random (dentro de la cantidad de huevos) para indicar en cual huevo debe salir un topo
  var num = parseInt(Math.random() * 12);
  $(".items").removeClass("active");
  $(".items:nth-child(" + num + ")").addClass("active");
};

function mapActualization() {
  // Utiliza "stage" en local storage para indicar el desafío que se esta realizando
  // Cuando se gana lo que hace esta función es incrementar en uno dicha variable
  let currentStage = localStorage.getItem("stage");
  currentStage++;
  localStorage.setItem("stage", currentStage);
}
