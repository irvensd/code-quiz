//Array for questions and answers
var questions = [
  {
    question: "1. Which built-in method returns the length of the string?",
    answers: [
      "length()",
      " size()",
      "index()",
      "None of the above."
    ],
    correctAnswer: "length()",
  },
  {
    question: "2. Which of the following code creates an object?",
    answers: [
      "var book = Object()",
      "var book = new Object()",
      "var book = new OBJECT()",
      "var book = new Book()"
    ],
    correctAnswer: "var book = new Object()",
  },
  {
    question: "3. Which company developed JavaScript?",
    answers: [
     "Netscape",
     "Google" ,
      "Datto",
     "Lakers",
    ],
    
    correctAnswer: "Netscape",
  }, 
  {
    question: "4. Which type of JavaScript language is?", 
    answers: [
      "Object-Oriented",
      "Object-Based", 
      "Assembly-language",
      "High-level"
    ],
      correctAnswer: "Object-Based",
  },
  {
    question: "5. Using _______ statement is how you test for a specific condition.", 
    answers: [
      "Select",
      "if", 
      "Switch",
      "For"
    ],
      correctAnswer: "if",
  },
];

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
  timeLeft--;
  document.getElementById("timeLeft").innerHTML = timeLeft;
  //proceed to end the game function when timer is below 0 at any time
  if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(); 
  }
}, 1000);

next();
}

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
  JavaScript Quiz!
</h1>
<h3>
  Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 15; 
next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
score += 20;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
  endGame();
  return;
}

var quizContent = "<h2>" + questions[currentQuestion].question + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].answers.length; buttonLoop++) {
  var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
  buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].answers[buttonLoop]);
  if (questions[currentQuestion].answers[buttonLoop] == questions[currentQuestion].correctAnswer) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
  } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
  }
  quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}

