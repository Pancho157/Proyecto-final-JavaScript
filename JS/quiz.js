const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const redirToGame = document.getElementById("game-redir");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex, correctAnswerCounter, calification, aproved;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  // Cuando se presiona el botón de siguiente hace que se incremente el índice de la pregunta a mostrar
  // Las preguntas pueden mostrarse en orden normal o inverso dependiendo del resultado de math.random()
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  // Esconde el botón para comenzar el juego
  // Ordena las preguntas de manera "random"
  // Indica que la pregunta a mostrar es la primera y la muestra
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  correctAnswerCounter = 0;
  aproved = false;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  // Elimina los botones de las respuestas anteriores y coloca nuevos botones con las nuevas respuestas
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  // muestra la pregunta que le sea indicada en el parametro
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    // genera los diferentes botones para las respuestas
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      // Verifica que la pregunta sea la correcta y lo coloca en el html para una posterior verificación
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    // Coloca los botones de respuestas
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  // Esconde el botón de siguiente y elimina las preguntas de la anterior pregunta
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  // Botón seleccionado
  const selectedButton = e.target;
  // Verifica que la respuesta sea la correcta con el dataset
  const correct = selectedButton.dataset.correct;
  calification = (correctAnswerCounter / shuffledQuestions.length) * 10;
  aproved = calification >= 6 ? true : false;

  // Transforma los botones de respuestas en un array y lo recorre para ver si los botones poseen el dataset.correct
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);

    // Verifica que el boton presionado sea el correcto
    if (selectedButton.dataset.correct){
      correctAnswerCounter++;
    }
  });

  // Verifica que haya más preguntas 
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } 
  // Verifica que no haya más preguntas y se haya aprobado
  else if (aproved === true && shuffledQuestions.length <= currentQuestionIndex + 1) {
    redirToGame.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);

  // Coloca la clase correct a la respuesta correcta y la erronea a las demas
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// Preguntas y respuestas de los diferentes desafios (cada uno separado por diferentes arrays)
const stage1 = [
  {
    question: "Pregunta 1 del stage 1",
    answers: [
      { text: "Correcta", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 1",
    answers: [
      { text: "Correcta", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 1",
    answers: [
      { text: "0", correct: false },
      { text: "Correcta", correct: true },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  }
];


// Preguntas y respuestas del segundo escenario
const stage2 = [
  {
    question: "Pregunta 1 del stage 2",
    answers: [
      { text: "Correcta", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 2 del stage 2",
    answers: [
      { text: "Correcta", correct: false },
      { text: "5", correct: true },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 3 del stage 2",
    answers: [
      { text: "Correcta", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
];


// Preguntas y respuestas del tercer escenario
const stage3 = [
  {
    question: "Pregunta 1 del stage 3",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 3",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 3",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  }
];

// Preguntas y respuestas del cuarto escenario
const stage4 = [
  {
    question: "Pregunta 1 del stage 4",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 4",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 4",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  }
];

// Preguntas y respuestas del quinto escenario
const stage5 = [
  {
    question: "Pregunta 1 del stage 5",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 5",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 5",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  }
];

// Preguntas y respuestas del sexto escenario
const stage6 = [
  {
    question: "Pregunta 1 del stage 6",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 6",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 6",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  }
];

// Preguntas y respuestas del septimo escenario
const stage7 = [
  {
    question: "Pregunta 1 del stage 7",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 7",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Pregunta 1 del stage 7",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
    ],
  }
];

// No verifico si existe debido a que a esta altura debería estar generado si o si por el mapa
var currentStage = localStorage.getItem("stage");
var questions = [];

//?  Hubiera sido más eficiente haber generado un array de mayor nivel que contuviera todos los arrays de los diferentes escenarios y luego igualar el array questions al escenario correspondiente?
// Verificar que escenario se encuentra jugando e igualar las preguntas correspondientes a ese escenario
if (currentStage == 0) {
  questions = stage1;
  redirToGame.href = "../pages/topo.html";
} else if (currentStage == 1) {
  questions = stage2;
  redirToGame.href = "../pages/memoria.html";
} else if (currentStage == 2) {
  questions = stage3;
  redirToGame.href = "../pages/topo.html";
} else if (currentStage == 3) {
  questions = stage4;
  redirToGame.href = "../pages/memoria.html";
} else if (currentStage == 4) {
  questions = stage5;
  redirToGame.href = "../pages/topo.html";
} else if (currentStage == 5) {
  questions = stage6;
  redirToGame.href = "../pages/memoria.html";
} else if (currentStage == 6) {
  questions = stage7;
  redirToGame.href = "../pages/topo.html";
}
