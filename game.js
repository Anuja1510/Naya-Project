const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
var count = 0;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Grand Central Terminal, Park Avenue, New York is the world's?",
    choice1: "largest railway station",
    choice2: "highest railway station",
    choice3: "longest railway station",
    choice4: "None of the above",
    answer: 1
  },
  {
    question:
      "Entomology is the science that studies?",
    choice1: "Behavior of human beings ",
    choice2: "Insects",
    choice3: "The origin and history of technical and scientific terms",
    choice4: "The formation of rocks",
    answer: 2
  },
  {
    question: "	Eritrea, which became the 182nd member of the UN in 1993, is in the continent of?",
    choice1: "Asia",
    choice2: "Africa",
    choice3: "Europe",
    choice4: "Australia",
    answer: 2
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore',score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};
var interval = setInterval(function(){
  document.getElementById('time').innerHTML=count;
  count++;
  }, 1000);
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }


    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {

    alert("Time is:"+interval);
      selectedChoice.parentElement.classList.remove(classToApply);

      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
/*var interval = setInterval(function(){
  document.getElementById('time').innerHTML=count;
  count--;
  if (count === -2){
    clearInterval(interval);
    document.getElementById('time').innerHTML='Done';
    // or...
    alert("You're out of time!");
    return window.location.assign("end.html");
  }
}, 1000);*/

startGame();
