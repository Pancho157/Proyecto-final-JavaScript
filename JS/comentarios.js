const URLGET = "https://jsonplaceholder.typicode.com/comments";
const main = document.getElementById("main");

// Importa 500 comentarios de la API mencionada arriba y los coloca en comentarios.html

function getComments() {
  $.get(URLGET, function (data, status) {
    if (status === "success") {
      let requestedData = data;
      console.log(requestedData);
      for (const data of requestedData) {
        $("main").append(`
        <div class="comment__container">
            <h2 class="user">${data.name}</h2>
            <p class="comment">${data.body}</p>
            <b class="comment__number">Comentario N° ${data.id}</b>
        </div>`);
      }
    }
  });
}

getComments();
