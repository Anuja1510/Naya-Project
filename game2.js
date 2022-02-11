const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
var count = 20;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "National Sports Day (NSD) is celebrated on which date in India??",
    choice1: "August 28",
    choice2: "August 29",
    choice3: "August 26",
    choice4: "August 27",
    answer: 2
  },
  {
    question:
      "The terms Volley, Smash, Service are related to which among the following sports?",
    choice1: "Volleyball ",
    choice2: "Table Tennis",
    choice3: "Lawn Tennis",
    choice4: "Badminton",
    answer: 2
  },
  {
    question: "Who has composed the FIFA anthem?",
    choice1: "Rob May",
    choice2: "Simon Hill",
    choice3: "Franz Lambert",
    choice4: "All of the above",
    answer: 3
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
    return window.location.assign("end2.html");
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
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
var interval = setInterval(function(){
  document.getElementById('time').innerHTML=count;
  count--;
  if (count === -2){
    clearInterval(interval);
    document.getElementById('time').innerHTML='Done';
    // or...
    alert("You're out of time!");
    return window.location.assign("end2.html");
  }
}, 1000);

startGame();
